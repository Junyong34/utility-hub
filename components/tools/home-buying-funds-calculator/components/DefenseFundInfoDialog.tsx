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

export function DefenseFundInfoDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="방위세공제 상세 설명 열기"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-full sm:max-w-2xl">
        <AlertDialogHeader className="justify-items-start text-left">
          <AlertDialogTitle className="w-full text-left">
            방공제(방위세공제)란?
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full space-y-4 text-left leading-6">
            <div>
              <p className="font-semibold text-foreground">개념</p>
              <p className="mt-1">
                은행이 주택을 담보로 대출할 때, 소액임차인(세입자)의 보증금을
                보호하기 위해 대출금액에서 미리 차감하는 금액입니다.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground">왜 존재하나요?</p>
              <p className="mt-1">
                <strong>주택임대차보호법</strong>에 따라 소액임차인은 경매 시
                은행보다 먼저 보증금을 돌려받을 권리가 있습니다. 은행은 나중에
                손해를 볼 수 있으므로, 미리 해당 금액을 대출한도에서 차감합니다.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground">지역별 기준액</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li>• <strong>서울</strong>: 5,500만원</li>
                <li>• <strong>과밀억제권역</strong> (성남, 고양, 과천 등): 5,000만원</li>
                <li>• <strong>광역시</strong> (부산, 대구, 대전 등): 2,800만원</li>
                <li>• <strong>기타 지방</strong>: 2,000만원</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-foreground">실제 영향 예시</p>
              <div className="mt-2 rounded-md bg-muted p-3 text-sm">
                <p><strong>아파트 가격</strong>: 5억원</p>
                <p><strong>LTV 70%</strong> → 이론상 3.5억 대출 가능</p>
                <p className="mt-2 text-primary">
                  <strong>서울 기준</strong>: 3.5억 - 5,500만원 = <strong>실제 대출 2.95억</strong>
                </p>
                <p className="mt-1 text-destructive">
                  → 생각보다 5,500만원 더 많은 현금이 필요합니다!
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
