import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { InstallmentCalculationResult } from '@/lib/tools/savings-calculator';
import {
  INTEREST_TYPE_LABELS,
  TAX_TYPE_LABELS,
} from '@/lib/tools/savings-calculator';
import {
  formatCurrencyToKoreanUnits,
  splitMonths,
} from '@/lib/tools/formatting';
import { currencyFormatter } from '../constants';
import { ShareButton } from './ShareButton';
import { getNumberInput } from '../utils';

interface InstallmentResultCardProps {
  result: InstallmentCalculationResult;
  monthly: string;
  rate: string;
  interestType: 'simple' | 'compound';
  taxType: 'general' | 'tax-benefit' | 'tax-free';
}

export function InstallmentResultCard({
  result,
  monthly,
  rate,
  interestType,
  taxType,
}: InstallmentResultCardProps) {
  const { years, months } = splitMonths(result.months);

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
            매월{' '}
            <span className="font-medium">
              {formatCurrencyToKoreanUnits(getNumberInput(monthly))}
            </span>
            씩 <span className="font-medium">{years}년</span>
            {months > 0 && <span className="font-medium"> {months}개월</span>}
            동안
            <br />
            <span className="font-medium">{rate}%</span>{' '}
            <span className="font-medium text-primary">
              {INTEREST_TYPE_LABELS[interestType]}, {TAX_TYPE_LABELS[taxType]}
            </span>
            로 적립하면
          </p>
          <p className="text-base font-medium text-foreground">
            총{' '}
            <span className="text-primary">
              {formatCurrencyToKoreanUnits(result.totalAmount)}
            </span>
            을 수령할 수 있습니다.
          </p>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">총 납입액</span>
            <span className="font-medium">
              {currencyFormatter.format(result.totalPrincipal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">세전 이자</span>
            <span className="font-medium">
              {currencyFormatter.format(result.grossInterest)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              이자과세 ({TAX_TYPE_LABELS[taxType]})
            </span>
            <span className="font-medium text-red-600">
              -{currencyFormatter.format(result.taxAmount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">세후 이자</span>
            <span className="font-medium">
              {currencyFormatter.format(result.netInterest)}
            </span>
          </div>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="text-center space-y-2 py-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            총 수령액
          </p>
          <p className="text-4xl font-bold text-primary">
            {currencyFormatter.format(result.totalAmount)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrencyToKoreanUnits(result.totalAmount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
