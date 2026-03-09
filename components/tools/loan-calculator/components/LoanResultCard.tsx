import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { RepaymentMethod } from '@/lib/tools/loan-calculator';
import {
  splitMonths,
  formatCurrencyToKoreanUnits,
} from '@/lib/tools/formatting';
import { currencyFormatter, REPAYMENT_METHODS } from '../constants';
import { getNumberInput } from '../utils';

interface LoanResultCardProps {
  result: {
    months: number;
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  };
  principal: string;
  annualRate: string;
  method: RepaymentMethod;
}

export function LoanResultCard({
  result,
  principal,
  annualRate,
  method,
}: LoanResultCardProps) {
  const { years, months } = splitMonths(result.months);
  const repaymentMethodLabel = REPAYMENT_METHODS.find(
    repaymentMethod => repaymentMethod.value === method
  )?.label;

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/12 via-primary/8 to-transparent shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">📊 계산 결과</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            <span className="font-medium">
              {formatCurrencyToKoreanUnits(getNumberInput(principal))}
            </span>
            을 <span className="font-medium">{years}년</span>
            {months > 0 && <span className="font-medium"> {months}개월</span>}
            동안
            <br />
            <span className="font-medium">{annualRate}%</span>{' '}
            <span className="font-medium text-primary">
              {repaymentMethodLabel}
            </span>
            으로 대출 받았을 때
          </p>
          <p className="text-base font-medium text-foreground">
            매월{' '}
            <span className="text-primary">
              {formatCurrencyToKoreanUnits(result.monthlyPayment)}
            </span>
            을 갚아야합니다.
          </p>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">대출원금</span>
            <span className="font-medium">
              {currencyFormatter.format(getNumberInput(principal))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총대출이자</span>
            <span className="font-medium">
              {currencyFormatter.format(result.totalInterest)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총상환금액</span>
            <span className="font-medium">
              {currencyFormatter.format(result.totalPayment)}
            </span>
          </div>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="text-center space-y-2 py-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            매월 상환금액
          </p>
          <p className="text-4xl font-bold text-primary">
            {currencyFormatter.format(result.monthlyPayment)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrencyToKoreanUnits(result.monthlyPayment)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
