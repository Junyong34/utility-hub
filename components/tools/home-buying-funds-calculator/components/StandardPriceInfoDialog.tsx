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
import { Info } from 'lucide-react';
import { STANDARD_PRICE_GUIDE_SECTIONS } from '@/lib/tools/home-buying-funds-calculator/standard-price-guide';
import { FIELD_LABELS } from '../constants';

export function StandardPriceInfoDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label={`${FIELD_LABELS.standardPrice} 상세 설명 열기`}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-full sm:max-w-2xl">
        <AlertDialogHeader className="justify-items-start text-left">
          <AlertDialogTitle className="w-full text-left">시가표준액 안내</AlertDialogTitle>
          <AlertDialogDescription className="w-full text-left leading-6">
            조회 경로와 분양아파트 입력 기준을 한 번에 확인할 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto pr-1">
          {STANDARD_PRICE_GUIDE_SECTIONS.map(section => (
            <section key={section.title} className="space-y-2 text-sm leading-6">
              <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
              <p className="text-muted-foreground">{section.body}</p>
              {section.items ? (
                <ul className="space-y-1 pl-5 text-muted-foreground list-disc">
                  {section.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
