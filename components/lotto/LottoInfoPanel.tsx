import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface LottoInfoPanelProps {
  latestRound?: number;
}

export function LottoInfoPanel({ latestRound }: LottoInfoPanelProps) {
  // 사이드바 영역은 desktop 전용이며, 사용법/안내/추가 링크 카드를 그룹화합니다.
  return (
    <div className="hidden lg:block space-y-6">
      <LottoInfoCards latestRound={latestRound} />
    </div>
  );
}

function LottoInfoCards({ latestRound }: { latestRound?: number }) {
  // 최신 회차 링크와 기본 사용 규칙을 UI 카드로 분리해 렌더링합니다.
  const commonCardClass = 'p-6';

  return (
    <>
      <Card
        className={`${commonCardClass} bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 dark:from-purple-500/20 dark:to-pink-500/20 dark:border-purple-500/30`}
      >
        <h3 className="text-lg font-bold mb-3 text-foreground">사용 방법</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• 추천 방식과 개수를 선택하세요</li>
          <li>• 번호 생성 버튼을 클릭하세요</li>
          <li>• 번호 복사 또는 공유 링크 복사를 사용하세요</li>
          <li>• 마음에 드는 번호는 저장해 반복 방문에 활용하세요</li>
        </ul>
      </Card>

      <Card className={commonCardClass}>
        <h3 className="text-lg font-bold mb-4 text-foreground">로또 안내</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold mb-1 text-foreground">번호 범위</p>
            <p className="text-muted-foreground">1~45 사이의 숫자</p>
          </div>
          <div>
            <p className="font-semibold mb-1 text-foreground">선택 개수</p>
            <p className="text-muted-foreground">중복되지 않는 6개의 번호</p>
          </div>
          <div>
            <p className="font-semibold mb-1 text-foreground">저장 기능</p>
            <p className="text-muted-foreground">
              생성한 번호를 로컬에 저장할 수 있습니다
            </p>
          </div>
        </div>
      </Card>

      <Card
        className={`${commonCardClass} bg-yellow-500/10 border-yellow-500/20 dark:bg-yellow-500/20 dark:border-yellow-500/30`}
      >
        <h3 className="text-sm font-bold mb-2 text-foreground">주의사항</h3>
        <p className="text-xs text-muted-foreground">
          본 서비스는 엔터테인먼트 목적으로 제공되며, 당첨을 보장하지 않습니다.
          책임감 있는 구매를 권장합니다.
        </p>
      </Card>

      <Card className={commonCardClass}>
        <h3 className="text-lg font-bold mb-3 text-foreground">
          추가 분석 페이지
        </h3>
        <div className="space-y-2 text-sm">
          <Link
            href="/tools/lotto/stats"
            className="block text-primary hover:underline"
          >
            로또 번호 통계 보기
          </Link>
          {latestRound && (
            <Link
              href={`/tools/lotto/round/${latestRound}`}
              className="block text-primary hover:underline"
            >
              로또 {latestRound}회 분석 보기
            </Link>
          )}
        </div>
      </Card>
    </>
  );
}
