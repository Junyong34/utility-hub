'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { celebrate } from '@/components/magicui/confetti';
import {
  calculateRankedUsers,
  calculateScore,
  canStart,
  canStop,
  createInitialGameStateFromProfiles,
  createPlayerProfiles,
  formatStopwatchTime,
  getTopDoneUserId,
  type LastDigitGamePlayerProfile,
  type LastDigitGamePhase,
  type LastDigitGameState,
  type LastDigitGameUser,
  DEFAULT_LAST_DIGIT_GAME_PLAYERS,
  MAX_LAST_DIGIT_GAME_PLAYERS,
} from '@/lib/tools/last-digit-game';

const USER_STATUSES: Record<LastDigitGameUser['status'], string> = {
  waiting: '대기',
  playing: '진행',
  done: '완료',
};

function clampPlayerCount(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_LAST_DIGIT_GAME_PLAYERS;
  }

  return Math.max(1, Math.min(MAX_LAST_DIGIT_GAME_PLAYERS, Math.floor(value)));
}

function getActiveUser(
  state: LastDigitGameState
): LastDigitGameUser | undefined {
  if (state.users.length === 0) {
    return undefined;
  }

  const isReadyToNext = state.phase === 'readyToNext' && !state.isRunning;
  if (isReadyToNext) {
    return (
      state.users[state.currentUserIndex + 1] ??
      state.users[state.currentUserIndex]
    );
  }

  return state.users[state.currentUserIndex];
}

function getCurrentAttemptMessage(
  state: LastDigitGameState,
  activeUser: LastDigitGameUser | undefined
) {
  if (state.phase === 'finished' || state.phase === 'result') {
    return '게임이 준비되지 않았습니다.';
  }

  if (state.users.length === 0) {
    return '참가자 설정에서 "참가자 생성"을 눌러 시작하세요.';
  }

  if (state.isRunning) {
    return `${activeUser?.name ?? '현재 사용자'} 측정 중입니다.`;
  }

  if (state.phase === 'idle') {
    return '현재 사용자 타이머를 시작하려면 Start 버튼을 누르세요.';
  }

  if (state.phase === 'readyToFirstStop') {
    return `${activeUser?.name ?? '현재 사용자'}의 1회차 기록이 대기 중입니다.`;
  }

  if (state.phase === 'readyToSecondStart') {
    return `${activeUser?.name ?? '현재 사용자'}의 2회차 준비 중입니다.`;
  }

  if (state.phase === 'readyToNext') {
    return `${activeUser?.name ?? '다음 참가자'} 차례입니다.`;
  }

  return '게임 준비 상태를 확인하세요.';
}

function getStartButtonLabel(state: LastDigitGameState) {
  if (state.isRunning) {
    return 'Stop';
  }

  if (state.phase === 'readyToSecondStart') {
    return '2회차 시작';
  }

  if (state.phase === 'readyToNext') {
    return '다음 차례 시작';
  }

  return 'Start';
}

function getPhaseBadgeClass(
  state: LastDigitGameState,
  activeUser: LastDigitGameUser | undefined
) {
  if (state.isRunning) {
    return {
      label: `${activeUser?.name || '현재 사용자'} 실행 중`,
      className: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/40',
    };
  }

  if (state.phase === 'readyToSecondStart') {
    return {
      label: '2회차 대기',
      className: 'bg-blue-500/15 text-blue-600 border-blue-500/40',
    };
  }

  if (state.phase === 'readyToNext') {
    return {
      label: `${activeUser?.name || '다음 참가자'} 차례`,
      className: 'bg-purple-500/15 text-purple-600 border-purple-500/40',
    };
  }

  if (state.phase === 'result') {
    return {
      label: '결과 발표',
      className: 'bg-amber-500/15 text-amber-600 border-amber-500/40',
    };
  }

  return {
    label: '준비',
    className: 'bg-muted text-muted-foreground border-border',
  };
}

function getActionStateInfo(
  state: LastDigitGameState,
  activeUser: LastDigitGameUser | undefined
) {
  if (state.phase === 'result') {
    return {
      heading: '게임 종료',
      description: '모든 사용자의 2회 기록이 완료되었습니다.',
      emphasis: '결과 모달에서 최종 순위를 확인하세요.',
    };
  }

  if (!state.users.length) {
    return {
      heading: '참가자 설정 필요',
      description: '게임 시작 전 참가자 목록을 먼저 생성해야 합니다.',
      emphasis: `최대 ${MAX_LAST_DIGIT_GAME_PLAYERS}명까지 지원합니다.`,
    };
  }

  if (state.phase === 'readyToSecondStart' && !state.isRunning) {
    return {
      heading: '2회차 시작 대기',
      description: '1회차를 완료했습니다. Start로 2회차를 시작하세요.',
      emphasis: '2회차는 반드시 1회차 이어서 진행됩니다.',
    };
  }

  if (state.phase === 'readyToNext' && !state.isRunning) {
    return {
      heading: `${activeUser?.name ?? '다음 참가자'} 차례 진입`,
      description: '현재 사용자 기록이 완료되었습니다.',
      emphasis: 'Start를 누르면 다음 참가자 순서로 진행됩니다.',
    };
  }

  if (state.isRunning) {
    return {
      heading: '타이머 진행',
      description: 'Stop 버튼으로 현재 기록을 저장하세요.',
      emphasis: '연타/중복 클릭은 Start/Stop 상태 가드로 차단됩니다.',
    };
  }

  return {
    heading: '게임 준비',
    description: 'Start 버튼으로 현재 사용자 타임 측정을 시작하세요.',
    emphasis: `완료: ${state.users.filter(user => user.status === 'done').length}/${state.users.length}`,
  };
}

function getPlacementLabel(rank: number, totalCount: number) {
  if (rank === 1) {
    return {
      label: '1st',
      variant: 'bg-amber-500/15 text-amber-700 border-amber-500/40',
    };
  }

  if (rank === 2) {
    return {
      label: '2nd',
      variant: 'bg-slate-500/15 text-slate-700 border-slate-500/40',
    };
  }

  if (rank === 3) {
    return {
      label: '3rd',
      variant: 'bg-violet-500/15 text-violet-700 border-violet-500/40',
    };
  }

  if (rank === totalCount) {
    return {
      label: '꼴등 💀',
      variant:
        'bg-gradient-to-r from-zinc-600 to-zinc-700 text-white border-zinc-500/60',
    };
  }

  return {
    label: `${rank}위`,
    variant: 'bg-card text-muted-foreground border-border',
  };
}

function getRankName(rank: number, userStatus: LastDigitGameUser['status']) {
  if (userStatus !== 'done') {
    return `${rank}위 예상`;
  }

  if (rank === 1) {
    return '1st';
  }

  if (rank === 2) {
    return '2nd';
  }

  return `${rank}위`;
}

function getRankMovement(delta: number) {
  if (delta > 0) {
    return {
      label: `🔺 +${delta}`,
      className: 'border-emerald-500/40 text-emerald-700 bg-emerald-500/10',
    };
  }

  if (delta < 0) {
    return {
      label: `🔻 ${delta}`,
      className: 'border-rose-500/40 text-rose-700 bg-rose-500/10',
    };
  }

  return null;
}

export function LastDigitGameTool() {
  const [playerCountInput, setPlayerCountInput] = useState<string>(
    String(DEFAULT_LAST_DIGIT_GAME_PLAYERS)
  );
  const [draftProfiles, setDraftProfiles] = useState<
    LastDigitGamePlayerProfile[]
  >(createPlayerProfiles(DEFAULT_LAST_DIGIT_GAME_PLAYERS));
  const [gameState, setGameState] = useState<LastDigitGameState>(() =>
    createInitialGameStateFromProfiles([])
  );
  const [attemptElapsedMs, setAttemptElapsedMs] = useState(0);
  const [resultOpen, setResultOpen] = useState(false);

  const attemptStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const rankingRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const previousRankingPositions = useRef<Map<number, number>>(new Map());

  const rankedUsers = useMemo(
    () => calculateRankedUsers(gameState.users),
    [gameState.users]
  );
  const hasPlayers = gameState.users.length > 0;
  const activeUser = getActiveUser(gameState);
  const phaseBadge = getPhaseBadgeClass(gameState, activeUser);
  const actionLabel = getStartButtonLabel(gameState);
  const actionInfo = getActionStateInfo(gameState, activeUser);
  const currentAttemptMessage = getCurrentAttemptMessage(gameState, activeUser);
  const currentActiveColor = activeUser?.color ?? null;

  const doneUsersCount = gameState.users.filter(
    user => user.status === 'done'
  ).length;

  const currentAttemptText = gameState.isRunning
    ? formatStopwatchTime(attemptElapsedMs)
    : '00:00:00';

  const currentActiveName = activeUser?.name ?? '대기중인 참가자';

  useEffect(() => {
    if (!gameState.isRunning || attemptStartRef.current === null) {
      return;
    }

    const tick = () => {
      const now = performance.now();
      setAttemptElapsedMs(now - attemptStartRef.current!);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [gameState.isRunning]);

  const stopClock = () => {
    attemptStartRef.current = null;
    setAttemptElapsedMs(0);
  };

  const applyGameStateFromProfiles = (
    profiles: LastDigitGamePlayerProfile[]
  ) => {
    const safeCount = clampPlayerCount(profiles.length);
    const safeProfiles = profiles.slice(0, safeCount);
    const nextState = createInitialGameStateFromProfiles(safeProfiles);

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    setGameState(nextState);
    setAttemptElapsedMs(0);
    setResultOpen(false);
    setPlayerCountInput(String(safeCount));
    attemptStartRef.current = null;
    return nextState;
  };

  const startNextAttempt = () => {
    if (!canStart(gameState)) {
      return;
    }

    attemptStartRef.current = performance.now();
    setAttemptElapsedMs(0);

    setGameState(prevState => {
      const users = [...prevState.users];
      const nextIndex =
        prevState.phase === 'readyToNext'
          ? prevState.currentUserIndex + 1
          : prevState.currentUserIndex;
      const selected = users[nextIndex];

      if (!selected || selected.status === 'done') {
        return prevState;
      }

      users[nextIndex] = {
        ...selected,
        status: 'playing',
      };

      return {
        ...prevState,
        users,
        currentUserIndex: nextIndex,
        isRunning: true,
        phase:
          prevState.phase === 'readyToSecondStart'
            ? 'readyToSecondStart'
            : 'readyToFirstStop',
      };
    });
  };

  const finalizeAttempt = () => {
    if (!canStop(gameState)) {
      return;
    }

    if (attemptStartRef.current === null) {
      return;
    }

    const now = performance.now();
    const formattedTime = formatStopwatchTime(now - attemptStartRef.current);
    const previousTop = getTopDoneUserId(gameState.users);
    const users = [...gameState.users];
    const current = users[gameState.currentUserIndex];

    if (!current || current.status === 'done') {
      stopClock();
      return;
    }

    const copiedTimes = [...current.times, formattedTime];

    if (gameState.phase === 'readyToFirstStop') {
      users[gameState.currentUserIndex] = {
        ...current,
        times: copiedTimes.slice(0, 1),
      };

      setGameState(prevState => ({
        ...prevState,
        users,
        isRunning: false,
        phase: 'readyToSecondStart',
      }));
      stopClock();
      return;
    }

    const resolvedTimes = copiedTimes.slice(0, 2);
    const score = calculateScore(
      resolvedTimes[0] ?? '00:00:00',
      resolvedTimes[1] ?? '00:00:00'
    );
    const isLastUser =
      gameState.currentUserIndex === gameState.users.length - 1;

    users[gameState.currentUserIndex] = {
      ...current,
      times: resolvedTimes,
      score,
      status: 'done',
      finishedAt: now,
    };

    const nextPhase: LastDigitGamePhase = isLastUser ? 'result' : 'readyToNext';
    const nextTop = getTopDoneUserId(users);
    const isNewLeader = nextTop !== null && nextTop !== previousTop;

    setGameState(prevState => ({
      ...prevState,
      users,
      isRunning: false,
      phase: nextPhase,
    }));
    stopClock();

    if (isLastUser) {
      setResultOpen(true);
    }

    if (isNewLeader) {
      setTimeout(() => {
        celebrate();
      }, 300);
    }
  };

  const handleMainAction = () => {
    if (!hasPlayers) {
      return;
    }

    if (gameState.isRunning) {
      finalizeAttempt();
      return;
    }

    if (!canStart(gameState)) {
      return;
    }

    startNextAttempt();
  };

  const handleReset = () => {
    applyGameStateFromProfiles(draftProfiles);
  };

  const handlePlayerCountUpdate = (value: string) => {
    setPlayerCountInput(value);

    const trimmed = value.trim();
    if (trimmed.length === 0) {
      setDraftProfiles([]);
      return;
    }

    if (!/^[0-9]+$/.test(trimmed)) {
      setDraftProfiles([]);
      return;
    }

    const safeCount = clampPlayerCount(Number(trimmed));
    setDraftProfiles(createPlayerProfiles(safeCount));
  };

  const applyPlayerSetup = () => {
    if (gameState.isRunning) {
      return;
    }

    const trimmedCount = playerCountInput.trim();
    const safeCount =
      trimmedCount.length === 0 || !/^[0-9]+$/.test(trimmedCount)
        ? DEFAULT_LAST_DIGIT_GAME_PLAYERS
        : clampPlayerCount(Number(trimmedCount));
    const safeProfiles = createPlayerProfiles(safeCount);

    setDraftProfiles(safeProfiles);
    applyGameStateFromProfiles(safeProfiles);
    setPlayerCountInput(String(safeCount));

    if (dashboardRef.current) {
      window.requestAnimationFrame(() => {
        dashboardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const isMainActionDisabled =
    !hasPlayers ||
    (gameState.isRunning ? !canStop(gameState) : !canStart(gameState));
  const isResetDisabled = gameState.isRunning;
  const isSetupDisabled = gameState.isRunning;
  const previousRanksRef = useRef<Map<number, number>>(new Map());

  const rankMovementMap = useMemo(() => {
    const map = new Map<number, number>();
    const hasHistory = previousRanksRef.current.size > 0;

    if (!hasHistory) {
      return map;
    }

    rankedUsers.forEach((user, index) => {
      const previousRank = previousRanksRef.current.get(user.id);
      if (previousRank === undefined) {
        return;
      }

      map.set(user.id, previousRank - (index + 1));
    });

    return map;
  }, [rankedUsers]);

  useLayoutEffect(() => {
    const previous = new Map(previousRankingPositions.current);
    const nextPositions = new Map<number, number>();

    rankedUsers.forEach(user => {
      const element = rankingRefs.current.get(user.id);
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const previousTop = previous.get(user.id);
      const currentTop = rect.top;
      nextPositions.set(user.id, currentTop);

      if (previousTop === undefined) {
        return;
      }

      const deltaY = previousTop - currentTop;
      if (Math.abs(deltaY) < 0.5) {
        return;
      }

      const animation = element.animate(
        [
          { transform: `translateY(${deltaY}px)` },
          { transform: 'translateY(0)' },
        ],
        {
          duration: 280,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both',
        }
      );

      animation.onfinish = () => {
        element.style.transform = '';
      };
    });

    previousRankingPositions.current = nextPositions;
    previousRanksRef.current = new Map(
      rankedUsers.map((user, index) => [user.id, index + 1])
    );
  }, [rankedUsers]);

  return (
    <div className="space-y-6">
      <Card className="border-border/70 bg-card/90">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-2xl">랜덤 스톱워치 게임</CardTitle>
              <CardDescription>
                초 끝자리 추출 × 2회 기록, 점수 경쟁 게임
              </CardDescription>
            </div>
            <Badge className={cn('px-3 py-1', phaseBadge.className)}>
              {phaseBadge.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{actionInfo.heading}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-1 xl:grid-cols-[1fr_1.5fr]">
            <section className="space-y-4 min-w-0">
              <div className="rounded-lg border border-foreground/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  참가자 설정
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  최대 {MAX_LAST_DIGIT_GAME_PLAYERS}명까지 설정 가능. 참가자
                  생성 후에만 게임을 시작할 수 있습니다.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Input
                    className="w-24"
                    value={playerCountInput}
                    onChange={event =>
                      handlePlayerCountUpdate(event.target.value)
                    }
                    inputMode="numeric"
                    type="text"
                  />
                  <Button
                    onClick={applyPlayerSetup}
                    disabled={isSetupDisabled}
                    className="min-w-[140px]"
                  >
                    참가자 생성
                  </Button>
                </div>
              </div>

            </section>

            <section className="space-y-4 min-w-0">
              <div className="rounded-lg border border-foreground/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  참가 순서 및 완료 대시보드
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  참가 완료: {doneUsersCount}명 / {gameState.users.length}명
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {hasPlayers ? (
                    <p className="truncate text-foreground">
                      다음 차례:{' '}
                      <span
                        className={cn(
                          'font-extrabold text-base',
                          currentActiveColor
                            ? `bg-gradient-to-r ${currentActiveColor} bg-clip-text text-transparent`
                            : 'text-foreground'
                        )}
                      >
                        {currentActiveName}
                      </span>
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      참가자 생성을 먼저 해주세요.
                    </p>
                  )}
                </div>
                <div ref={dashboardRef} className="mt-4">
                  {hasPlayers ? (
                    <div className="grid grid-cols-3 gap-2">
                      {gameState.users.map((user, index) => (
                        <div
                          key={user.id}
                          className={cn(
                            'flex flex-wrap items-center justify-between gap-2 rounded-md border px-2 py-2 text-xs',
                            user.status === 'done'
                              ? 'border-white/25 bg-gradient-to-r text-white'
                              : index === gameState.currentUserIndex
                                ? 'border-white/40 bg-gradient-to-r text-white'
                                : 'border-white/20 bg-gradient-to-r text-white/90',
                            user.color
                          )}
                        >
                          <p className="min-w-0 flex-1">
                            <span className="mr-1 rounded-md border border-white/40 bg-white/20 px-1.5 py-0.5 text-xs font-bold text-white">
                              {index + 1}-순서
                            </span>{' '}
                            <span className="font-semibold text-white">
                              {user.name}
                            </span>
                          </p>
                          <Badge
                            variant="outline"
                            className="border-white/60 text-white"
                          >
                            {USER_STATUSES[user.status]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      아직 참가자가 없습니다.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-foreground/20 p-4 relative">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    현재 사용자 타이머
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReset()}
                    disabled={isResetDisabled}
                    className="h-8 px-3 text-xs"
                  >
                    초기화
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  현재 사용자:{' '}
                  <span
                    className={cn(
                      'inline-block font-extrabold',
                      'text-2xl tracking-tight',
                      currentActiveColor
                        ? `bg-gradient-to-r ${currentActiveColor} bg-clip-text text-transparent`
                        : 'text-foreground'
                    )}
                  >
                    {currentActiveName}
                  </span>
                </p>
                <p className="mt-2 text-8xl font-black tracking-tight tabular-nums">
                  {currentAttemptText}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {currentAttemptMessage}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {actionInfo.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    size="lg"
                    onClick={handleMainAction}
                    disabled={isMainActionDisabled}
                    className={cn(
                      'h-16 w-full text-xl sm:min-w-[48%]',
                      gameState.isRunning
                        ? 'bg-rose-500 hover:bg-rose-600'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    )}
                  >
                    {actionLabel}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border/70">
        <CardHeader>
          <CardTitle>참가자 목록 / 실시간 랭킹</CardTitle>
          <CardDescription>
            동점은 완료 순서(타임스탬프)로 우선 정렬합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {rankedUsers.map((user, index) => {
              const rankLabel = getPlacementLabel(
                user.rank,
                rankedUsers.length
              );
              const userIndex = gameState.users.findIndex(
                item => item.id === user.id
              );
              const isCurrent =
                gameState.currentUserIndex === userIndex &&
                !gameState.isRunning &&
                gameState.phase === 'readyToNext';
              const isPlaying =
                gameState.isRunning && gameState.currentUserIndex === userIndex;
              const isDone = user.status === 'done';
              const orderText =
                userIndex >= 0 ? `${userIndex + 1}-순서` : '미확인';
              const rankMovement = rankMovementMap.get(user.id);
              const movementInfo =
                rankMovement === undefined ? null : getRankMovement(rankMovement);

              return (
                <div
                  key={user.id}
                  className={cn(
                    'rounded-lg border p-3 transition-all duration-300',
                      isPlaying && 'ring-2 ring-emerald-500/40 bg-emerald-500/10',
                    isCurrent && 'ring-2 ring-blue-500/40 bg-blue-500/10',
                    isDone &&
                      !isPlaying &&
                      'border-emerald-500/40 bg-emerald-500/5'
                  )}
                  ref={element => {
                      if (element) {
                        rankingRefs.current.set(user.id, element);
                        return;
                      }

                      rankingRefs.current.delete(user.id);
                    }}
                  >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn(
                          'inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r',
                          user.color
                        )}
                      />
                      <p className="font-semibold truncate">{user.name}</p>
                      <Badge
                        variant="secondary"
                        className="bg-muted/60 text-muted-foreground font-semibold"
                      >
                        {orderText}
                      </Badge>
                      <Badge className={cn('border', rankLabel.variant)}>
                        {rankLabel.label}
                      </Badge>
                      {movementInfo && (
                        <Badge className={cn('font-bold', movementInfo.className)}>
                          {movementInfo.label}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {USER_STATUSES[user.status]}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold">
                      {isDone
                        ? `점수 ${user.score}점`
                        : getRankName(user.rank, user.status)}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <p>
                      기록1:{' '}
                      <span className="font-bold text-foreground">
                        {user.times[0] ?? '-'}
                      </span>
                    </p>
                    <p>
                      기록2:{' '}
                      <span className="font-bold text-foreground">
                        {user.times[1] ?? '-'}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
            {!hasPlayers && (
              <p className="text-sm text-muted-foreground">
                참가자 생성 후 실시간 랭킹을 확인할 수 있습니다.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={resultOpen} onOpenChange={setResultOpen}>
        <AlertDialogContent className="max-w-full sm:max-w-2xl lg:max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              🏆 게임 결과 발표
            </AlertDialogTitle>
            <AlertDialogDescription>
              전체 참가자가 완료되어 최종 점수를 계산했습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
            {rankedUsers.map((user, index) => {
              const rankInfo = getPlacementLabel(user.rank, rankedUsers.length);
              const crown =
                index === 0
                  ? '🥇'
                  : index === 1
                    ? '🥈'
                    : index === 2
                      ? '🥉'
                      : '';
              return (
                <div
                  key={user.id}
                  className={cn(
                    'rounded-md border px-3 py-2 text-sm transition-all duration-300',
                    index === 0
                      ? 'border-amber-500/50 bg-amber-500/15'
                      : index === rankedUsers.length - 1
                        ? 'border-zinc-500/60 bg-zinc-600/20'
                      : 'border-border/70'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold">
                        {crown} {index + 1}위
                      </span>
                      <p className="font-semibold">{user.name}</p>
                      <Badge className={cn('border', rankInfo.variant)}>
                        {rankInfo.label}
                      </Badge>
                    </div>
                    <p className="font-bold text-foreground">
                      {user.status === 'done' ? `${user.score}점` : '미완료'}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    기록:{' '}
                    <span className="font-bold text-foreground">
                      {user.times[0] ?? '--'}
                    </span>{' '}
                    /{' '}
                    <span className="font-bold text-foreground">
                      {user.times[1] ?? '--'}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className="h-12 px-6"
              onClick={() => applyGameStateFromProfiles(draftProfiles)}
            >
              새 게임 시작
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
