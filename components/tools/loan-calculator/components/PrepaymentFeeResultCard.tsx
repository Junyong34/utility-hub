import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { PrepaymentFeeResult } from '@/lib/tools/prepayment-fee-calculator';
import {
  formatCurrencyToKoreanUnits,
  formatDateToKorean,
} from '@/lib/tools/formatting';
import { currencyFormatter } from '../constants';
import { getNumberInput } from '../utils';
import { ResultSummaryLabel } from './ResultSummaryLabel';
import { ShareButton } from './ShareButton';

interface PrepaymentFeeResultCardProps {
  result: PrepaymentFeeResult;
  repaymentAmount: string;
  feeRate: string;
  repaymentDate?: Date;
}

export function PrepaymentFeeResultCard({
  result,
  repaymentAmount,
  feeRate,
  repaymentDate,
}: PrepaymentFeeResultCardProps) {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/12 via-primary/8 to-transparent shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">📊 계산 결과</CardTitle>
          <ShareButton variant="outline" size="sm" showLabel={false} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            {repaymentDate && (
              <>
                <span className="font-medium">
                  {formatDateToKorean(repaymentDate)}
                </span>
                ,{' '}
              </>
            )}
            <span className="font-medium">
              {formatCurrencyToKoreanUnits(getNumberInput(repaymentAmount))}
            </span>
            을 상환할 경우
          </p>
          <p className="text-base font-medium text-foreground">
            예상되는 중도상환수수료는
            <br />약{' '}
            <span className="text-primary">
              {formatCurrencyToKoreanUnits(result.prepaymentFee)}
            </span>
            입니다
          </p>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">상환금액</span>
            <span className="font-medium">
              {currencyFormatter.format(getNumberInput(repaymentAmount))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">중도상환수수료율</span>
            <span className="font-medium">{feeRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <ResultSummaryLabel
              label="잔존기간"
              tooltipContent="면제시작까지기간-상환기일까지 기간"
            />
            <span className="font-medium">{result.remainingDays}일</span>
          </div>
          <div className="flex justify-between items-center">
            <ResultSummaryLabel
              label="대출기간"
              tooltipContent="면제시작까지기간"
            />
            <span className="font-medium">{result.totalDays}일</span>
          </div>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="text-center space-y-2 py-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            예상 중도상환수수료
          </p>
          <p className="text-4xl font-bold text-primary">
            {currencyFormatter.format(result.prepaymentFee)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrencyToKoreanUnits(result.prepaymentFee)}
          </p>
          <p className="text-xs text-muted-foreground pt-2">
            (상환금액 × 중도상환수수료율 × (잔존기간 / 대출기간))
          </p>
        </div>

        {result.isExempted && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-3 border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              ✓ 면제 기간이 경과하여 수수료가 면제됩니다.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
