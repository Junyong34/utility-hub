'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

interface RoundListItem {
  round: number;
  drawYear: string;
}

interface LottoRoundYearFilterProps {
  rounds: RoundListItem[];
  currentRound: number;
}

const ALL_YEARS = 'all';

function toSortableYear(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function LottoRoundYearFilter({
  rounds,
  currentRound,
}: LottoRoundYearFilterProps) {
  const years = useMemo(() => {
    return Array.from(new Set(rounds.map((item) => item.drawYear))).sort(
      (a, b) => toSortableYear(b) - toSortableYear(a)
    );
  }, [rounds]);

  const currentRoundYear =
    rounds.find((item) => item.round === currentRound)?.drawYear ??
    years[0] ??
    '';

  const [selectedYear, setSelectedYear] = useState<string>(() =>
    currentRoundYear || ALL_YEARS
  );

  const filteredRounds = useMemo(() => {
    if (selectedYear === ALL_YEARS) return rounds;
    return rounds.filter((item) => item.drawYear === selectedYear);
  }, [rounds, selectedYear]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">년도 필터</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={selectedYear === ALL_YEARS ? 'default' : 'outline'}
            size="sm"
            aria-pressed={selectedYear === ALL_YEARS}
            onClick={() => setSelectedYear(ALL_YEARS)}
          >
            전체
          </Button>
          {years.map((year) => (
            <Button
              key={year}
              type="button"
              variant={selectedYear === year ? 'default' : 'outline'}
              size="sm"
              aria-pressed={selectedYear === year}
              onClick={() => setSelectedYear(year)}
            >
              {year}년
            </Button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-sm font-medium">
            {selectedYear === ALL_YEARS
              ? '전체 회차'
              : `${selectedYear}년 회차`}
          </p>
          <p className="text-xs text-muted-foreground">
            {filteredRounds.length}개 회차
          </p>
        </div>
        <div className="max-h-64 overflow-y-auto rounded-md border p-3">
          <div className="flex flex-wrap gap-2">
            {filteredRounds.map((item) => (
              <Button
                key={item.round}
                variant={item.round === currentRound ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <Link href={`/tools/lotto/round/${item.round}`}>
                  {item.round}회
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
