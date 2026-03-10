import { currencyFormatter } from '../constants';

interface ResultSummaryLabelProps {
  label: string;
  value: number;
  labelSize?: 'sm' | 'base' | 'lg';
  valueSize?: 'base' | 'lg' | 'xl';
  valueColor?: string;
}

export function ResultSummaryLabel({
  label,
  value,
  labelSize = 'base',
  valueSize = 'base',
  valueColor = 'text-foreground',
}: ResultSummaryLabelProps) {
  const labelSizeClass =
    labelSize === 'sm'
      ? 'text-sm'
      : labelSize === 'lg'
        ? 'text-lg'
        : 'text-base';
  const valueSizeClass =
    valueSize === 'xl'
      ? 'text-xl'
      : valueSize === 'lg'
        ? 'text-lg'
        : 'text-base';

  return (
    <div className="flex items-center justify-between">
      <span className={`${labelSizeClass} text-muted-foreground`}>{label}</span>
      <span className={`${valueSizeClass} font-semibold ${valueColor}`}>
        {currencyFormatter.format(value)}
      </span>
    </div>
  );
}
