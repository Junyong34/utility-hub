import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ResultSummaryLabelProps {
  label: string;
  tooltipContent?: string;
}

export function ResultSummaryLabel({
  label,
  tooltipContent,
}: ResultSummaryLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{label}</span>
      {tooltipContent ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`${label} 도움말`}
              className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-primary/8 text-primary/70 shadow-sm shadow-primary/5 transition-all hover:border-primary/25 hover:bg-primary/12 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <Info className="h-3 w-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={10}
            className="max-w-[220px] rounded-2xl border-primary/15 bg-gradient-to-br from-background/95 via-background to-primary/10 px-3.5 py-3 text-[12px] text-foreground shadow-xl shadow-primary/10 backdrop-blur-md"
          >
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70">
                계산 기준
              </p>
              <p className="leading-relaxed text-foreground/90">
                {tooltipContent}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}
