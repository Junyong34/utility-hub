import assert from 'node:assert/strict';
import { register } from 'node:module';
import test from 'node:test';

const repositoryRoot = new URL('../../../../', import.meta.url).href;
const resolverSource = `
const repositoryRoot = ${JSON.stringify(repositoryRoot)};

export async function resolve(specifier, context, nextResolve) {
  const candidates = [];

  if (specifier.startsWith('@/')) {
    const baseUrl = new URL(specifier.slice(2), repositoryRoot).href;
    candidates.push(baseUrl, baseUrl + '.ts', baseUrl + '.tsx', baseUrl + '/index.ts', baseUrl + '/index.tsx');
  } else if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const baseUrl = new URL(specifier, context.parentURL).href;
    candidates.push(baseUrl, baseUrl + '.ts', baseUrl + '.tsx', baseUrl + '/index.ts', baseUrl + '/index.tsx');
  } else {
    return nextResolve(specifier, context);
  }

  let resolutionError;
  for (const candidate of candidates) {
    try {
      return await nextResolve(candidate, context);
    } catch (error) {
      resolutionError = error;
    }
  }

  throw resolutionError;
}
`;

register(
  `data:text/javascript,${encodeURIComponent(resolverSource)}`,
  import.meta.url
);

const {
  DSR_QUERY_PARSERS,
  parseExistingLoansFromQuery,
  parseNewLoanFromQuery,
  serializeExistingLoansForQuery,
  serializeNewLoanForQuery,
} = await import('./parsers.ts');

test('query가 없으면 DSR 계산기의 현재 공개 기본 상태로 복구한다', () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(DSR_QUERY_PARSERS).map(([queryKey, parser]) => [
        queryKey,
        parser.parseServerSide(null),
      ])
    ),
    {
      income: 0,
      policy: '2026-h1',
      calculated: false,
      newLoan: {
        id: 'new-loan',
        name: '신규 대출',
        loanType: 'mortgage',
        balance: 300_000_000,
        annualRate: 4.2,
        termMonths: 360,
        repaymentMethod: 'equal-payment',
        rateType: 'variable',
        regionType: 'capital',
      },
      existingLoans: [],
    }
  );
});

test('신규 대출은 ID와 이름을 제외한 compact JSON으로 왕복한다', () => {
  const loan = {
    id: 'external-id',
    name: '외부 이름',
    loanType: 'mortgage',
    balance: 123_456_789,
    annualRate: 3.75,
    termMonths: 180,
    repaymentMethod: 'equal-principal',
    rateType: 'mixed',
    regionType: 'local',
    introductoryPeriodMonths: 60,
  };
  const serialized = serializeNewLoanForQuery(loan);

  assert.deepEqual(
    {
      serialized,
      hydrated: parseNewLoanFromQuery(serialized),
    },
    {
      serialized:
        '{"lt":"mortgage","b":123456789,"ar":3.75,"tm":180,"rm":"equal-principal","rt":"mixed","rg":"local","ip":60}',
      hydrated: {
        id: 'new-loan',
        name: '신규 대출',
        loanType: 'mortgage',
        balance: 123_456_789,
        annualRate: 3.75,
        termMonths: 180,
        repaymentMethod: 'equal-principal',
        rateType: 'mixed',
        regionType: 'local',
        introductoryPeriodMonths: 60,
      },
    }
  );
});

test('보유 대출 목록은 순서를 기준으로 ID와 이름을 다시 부여한다', () => {
  const serialized = serializeExistingLoansForQuery([
    {
      id: 'credit-a',
      name: '신용 A',
      loanType: 'credit',
      balance: 20_000_000,
      annualRate: 5.1,
      termMonths: 36,
      repaymentMethod: 'lump-sum',
      rateType: 'fixed',
      regionType: 'capital',
    },
    {
      id: 'mortgage-b',
      name: '주담대 B',
      loanType: 'mortgage',
      balance: 200_000_000,
      annualRate: 3.9,
      termMonths: 240,
      repaymentMethod: 'equal-payment',
      rateType: 'variable',
      regionType: 'local',
    },
  ]);

  assert.deepEqual(
    {
      serialized,
      hydrated: parseExistingLoansFromQuery(serialized),
    },
    {
      serialized:
        '[{"lt":"credit","b":20000000,"ar":5.1,"tm":36,"rm":"lump-sum","rt":"fixed","rg":"none"},{"lt":"mortgage","b":200000000,"ar":3.9,"tm":240,"rm":"equal-payment","rt":"variable","rg":"local"}]',
      hydrated: [
        {
          id: 'existing-1',
          name: '보유 대출 1',
          loanType: 'credit',
          balance: 20_000_000,
          annualRate: 5.1,
          termMonths: 36,
          repaymentMethod: 'lump-sum',
          rateType: 'fixed',
          regionType: 'none',
          introductoryPeriodMonths: undefined,
        },
        {
          id: 'existing-2',
          name: '보유 대출 2',
          loanType: 'mortgage',
          balance: 200_000_000,
          annualRate: 3.9,
          termMonths: 240,
          repaymentMethod: 'equal-payment',
          rateType: 'variable',
          regionType: 'local',
          introductoryPeriodMonths: undefined,
        },
      ],
    }
  );
});

test('유효한 compact 대출의 음수와 기간 값은 현재 정규화 규칙으로 복구한다', () => {
  assert.deepEqual(
    parseNewLoanFromQuery(
      '{"lt":"credit","b":-10.6,"ar":-1.2,"tm":12.6,"rm":"lump-sum","rt":"mixed","rg":"capital","ip":99.8}'
    ),
    {
      id: 'new-loan',
      name: '신규 대출',
      loanType: 'credit',
      balance: 0,
      annualRate: 0,
      termMonths: 13,
      repaymentMethod: 'lump-sum',
      rateType: 'mixed',
      regionType: 'none',
      introductoryPeriodMonths: 13,
    }
  );
});

test('잘못된 JSON이나 enum은 parser 기본 상태로 복구한다', () => {
  assert.deepEqual(
    {
      invalidJson: parseNewLoanFromQuery('{invalid'),
      invalidEnum: parseNewLoanFromQuery(
        '{"lt":"invalid","b":1,"ar":1,"tm":1,"rm":"equal-payment","rt":"fixed","rg":"capital"}'
      ),
      invalidList: parseExistingLoansFromQuery(
        '[{"lt":"mortgage","b":1,"ar":1,"tm":1,"rm":"invalid","rt":"fixed","rg":"capital"}]'
      ),
      serverDefaults: Object.fromEntries(
        Object.entries(DSR_QUERY_PARSERS).map(([queryKey, parser]) => [
          queryKey,
          parser.parseServerSide('invalid'),
        ])
      ),
    },
    {
      invalidJson: null,
      invalidEnum: null,
      invalidList: null,
      serverDefaults: {
        income: 0,
        policy: '2026-h1',
        calculated: false,
        newLoan: {
          id: 'new-loan',
          name: '신규 대출',
          loanType: 'mortgage',
          balance: 300_000_000,
          annualRate: 4.2,
          termMonths: 360,
          repaymentMethod: 'equal-payment',
          rateType: 'variable',
          regionType: 'capital',
        },
        existingLoans: [],
      },
    }
  );
});
