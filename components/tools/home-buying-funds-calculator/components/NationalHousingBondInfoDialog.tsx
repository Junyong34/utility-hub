'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  NATIONAL_HOUSING_BOND_GUIDE_ROWS,
  NATIONAL_HOUSING_BOND_GUIDE_TITLE,
} from '@/lib/tools/home-buying-funds-calculator/national-housing-bond-guide';
import { Info } from 'lucide-react';

export function NationalHousingBondInfoDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="국민주택채권 실부담액 상세 설명 열기"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-full sm:max-w-3xl">
        <AlertDialogHeader className="justify-items-start text-left">
          <AlertDialogTitle className="w-full text-left">
            {NATIONAL_HOUSING_BOND_GUIDE_TITLE}
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full text-left leading-6">
            주택 시가표준액 구간에 따라 서울·광역시와 기타지역의 의무매입률이
            다르게 적용됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th
                    className="border-r px-3 py-3 text-left font-semibold"
                    rowSpan={2}
                  >
                    구분
                  </th>
                  <th
                    className="border-r px-3 py-3 text-left font-semibold"
                    rowSpan={2}
                  >
                    시가표준액
                  </th>
                  <th
                    className="px-3 py-3 text-center font-semibold"
                    colSpan={2}
                  >
                    의무매입률
                  </th>
                </tr>
                <tr className="border-b">
                  <th className="border-r px-3 py-3 text-center font-semibold">
                    서울·광역시
                  </th>
                  <th className="px-3 py-3 text-center font-semibold">
                    기타지역
                  </th>
                </tr>
              </thead>
              <tbody>
                {NATIONAL_HOUSING_BOND_GUIDE_ROWS.map((row, index) => (
                  <tr
                    key={row.standardPrice}
                    className={
                      index < NATIONAL_HOUSING_BOND_GUIDE_ROWS.length - 1
                        ? 'border-b'
                        : ''
                    }
                  >
                    {index === 0 ? (
                      <td
                        className="border-r px-4 py-3 align-middle font-medium"
                        rowSpan={NATIONAL_HOUSING_BOND_GUIDE_ROWS.length}
                      >
                        주택
                      </td>
                    ) : null}
                    <td className="border-r px-4 py-3">{row.standardPrice}</td>
                    <td className="border-r px-4 py-3 text-center">
                      {row.metroRate}
                    </td>
                    <td className="px-4 py-3 text-center">{row.otherRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
