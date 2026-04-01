'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Expand,
  Pause,
  Pencil,
  Play,
  RotateCcw,
  Save,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { celebrate } from '@/components/magicui/confetti';
import {
  createSession,
  getSessionPreview,
  normalizeDurationSeconds,
  normalizeTitle,
  pauseSession,
  resumeSession,
  shouldCompleteSession,
  completeSession,
} from '@/lib/tools/pomodoro/engine';
import { createPomodoroId } from '@/lib/tools/pomodoro/id.js';
import {
  createDefaultPomodoroStore,
  loadPomodoroStore,
  savePomodoroStore,
} from '@/lib/tools/pomodoro/storage';
import {
  getPomodoroThemeConfig,
  getPomodoroThemeEntries,
} from '@/lib/tools/pomodoro/theme';
import type {
  PomodoroActiveSession,
  PomodoroMode,
  PomodoroRecord,
  PomodoroTask,
  PomodoroTheme,
  PomodoroStore,
} from '@/lib/tools/pomodoro/types';
import { PomodoroCanvas } from './PomodoroCanvas';
import { PomodoroFAQ } from './PomodoroFAQ';

type TimerVisualStatus = 'idle' | 'running' | 'paused' | 'completed';

function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDurationLabel(durationSeconds: number): string {
  const minutes = Math.round(durationSeconds / 60);
  return `${minutes}분`;
}

function parseDurationMinutesInput(
  value: string,
  fallbackMinutes: number
): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallbackMinutes;
  }

  return parsed;
}

function getStatusCopy(
  activeSession: PomodoroActiveSession | null,
  completionState: { warning: boolean } | null
) {
  if (completionState) {
    return completionState.warning ? '저장 경고와 함께 완료' : '집중 완료';
  }

  if (!activeSession) {
    return '시작 대기';
  }

  if (activeSession.status === 'paused') {
    return '일시정지';
  }

  if (activeSession.status === 'running') {
    return '집중 중';
  }

  return '완료';
}

function getThemeHeroCopy(theme: PomodoroTheme) {
  if (theme === 'tomato') {
    return {
      heading: '주방 타이머처럼 바로 읽히는 토마토 집중 화면.',
      body: '토마토 실루엣, 칼릭스, 따뜻한 적색 계열을 한 덩어리로 묶어 이름과 인상이 정확히 맞아떨어지도록 다시 잡았습니다.',
    };
  }

  if (theme === 'minimal') {
    return {
      heading: '숫자와 바만 남긴 절제형 포커스 화면.',
      body: '큰 숫자, 긴 여백, 얇은 진행 바만 남겨 실무 도구처럼 빠르게 읽히도록 다듬은 미니멀 테마입니다.',
    };
  }

  if (theme === 'visual') {
    return {
      heading: '다이얼만 봐도 남은 시간이 읽히는 비주얼 타이머.',
      body: '웨지 채움과 분 눈금을 더 선명하게 잡아 앱 아이콘이 아니라 실제 다이얼 도구처럼 느껴지게 정리했습니다.',
    };
  }

  return {
    heading: '화분에서 새싹이 자라나는 코지 가든 타이머.',
    body: '단순한 초록 링 대신 화분, 흙, 줄기, 잎이 시간과 함께 자라나도록 바꿔서 가든 메타포가 즉시 읽히게 했습니다.',
  };
}

function createTask(
  title: string,
  durationMinutes: number,
  order: number
): PomodoroTask {
  const durationSeconds = normalizeDurationSeconds(durationMinutes * 60);

  return {
    id: createPomodoroId(),
    title: normalizeTitle(title, 80) || '새 작업',
    duration: durationSeconds,
    completed: false,
    order,
    updatedAt: new Date().toISOString(),
  };
}

function playCompletionTone(
  audioContextRef: React.MutableRefObject<AudioContext | null>
) {
  if (typeof window === 'undefined') {
    return;
  }

  const AudioContextConstructor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextConstructor) {
    throw new Error('AudioContext unavailable');
  }

  if (!audioContextRef.current) {
    audioContextRef.current = new AudioContextConstructor();
  }

  const context = audioContextRef.current;

  if (context.state === 'suspended') {
    context.resume();
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(660, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    880,
    context.currentTime + 0.18
  );

  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.35);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.36);
}

export function PomodoroTool() {
  const [store, setStore] = useState<PomodoroStore>(
    createDefaultPomodoroStore()
  );
  const [mode, setMode] = useState<PomodoroMode>('simple');
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [simpleTitle, setSimpleTitle] = useState('');
  const [simpleDurationInput, setSimpleDurationInput] = useState('25');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDurationInput, setTaskDurationInput] = useState('25');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [editingTaskDurationInput, setEditingTaskDurationInput] =
    useState('25');
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [editingRecordTitle, setEditingRecordTitle] = useState('');
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [completionState, setCompletionState] = useState<{
    record: PomodoroRecord;
    warning: boolean;
  } | null>(null);
  const storageRef = useRef<Storage | null>(null);
  const timerFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const fullscreenRef = useRef<HTMLDivElement | null>(null);

  const activeSession = store.activeSession;
  const selectedTask =
    store.tasks.find(task => task.id === selectedTaskId) ?? null;
  const defaultDurationMinutes = Math.max(
    1,
    Math.round(store.settings.defaultFocusTime / 60)
  );
  const simpleDurationMinutes = parseDurationMinutesInput(
    simpleDurationInput,
    defaultDurationMinutes
  );
  const taskDurationMinutes = parseDurationMinutesInput(taskDurationInput, 25);
  const preview = getSessionPreview({
    activeSession,
    mode,
    simpleTitle,
    simpleDurationMinutes,
    selectedTask,
    now: nowMs,
  });
  const displayRemainingMs = preview.remainingMs;
  const totalMs = preview.totalMs;
  const themeConfig = getPomodoroThemeConfig(store.settings.theme);
  const themeEntries = getPomodoroThemeEntries();
  const themeHeroCopy = getThemeHeroCopy(store.settings.theme);
  const visualStatus: TimerVisualStatus = completionState
    ? 'completed'
    : activeSession?.status === 'running'
      ? 'running'
      : activeSession?.status === 'paused'
        ? 'paused'
        : 'idle';
  const statusCopy = getStatusCopy(activeSession, completionState);
  const recentRecords = [...store.records].slice(-20).reverse();

  const applyLoadedStore = useEffectEvent(
    (loaded: ReturnType<typeof loadPomodoroStore>) => {
      setStore(loaded.store);
      setMode(loaded.store.settings.preferredMode);
      setSimpleDurationInput(
        String(
          Math.max(1, Math.round(loaded.store.settings.defaultFocusTime / 60))
        )
      );
      setSelectedTaskId(loaded.store.tasks[0]?.id ?? null);
      setHydrated(true);

      if (loaded.warning) {
        setMessage(loaded.warning);
      }
    }
  );

  const handleCompletion = useEffectEvent(
    (session: PomodoroActiveSession, completedAtMs: number) => {
      const completion = completeSession(session, completedAtMs);

      setStore(currentStore => {
        const nextTasks = currentStore.tasks.map(task =>
          task.id === completion.record.taskId
            ? {
                ...task,
                completed: true,
                updatedAt: completion.record.completedAt,
              }
            : task
        );

        return {
          ...currentStore,
          activeSession: null,
          tasks: nextTasks,
          records: [...currentStore.records, completion.record],
        };
      });

      setCompletionState({
        record: completion.record,
        warning: false,
      });

      setMessage(null);
      celebrate();

      if (store.settings.soundEnabled) {
        try {
          playCompletionTone(audioContextRef);
        } catch {
          setMessage(
            '브라우저 정책으로 완료 사운드가 차단되어 시각 효과만 표시했습니다.'
          );
          setCompletionState({
            record: completion.record,
            warning: true,
          });
        }
      }
    }
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    storageRef.current = window.localStorage;

    const loaded = loadPomodoroStore(window.localStorage);
    applyLoadedStore(loaded);
  }, []);

  useEffect(() => {
    if (!hydrated || !storageRef.current) {
      return;
    }

    const result = savePomodoroStore(storageRef.current, store);

    if (!result.ok && result.warning) {
      setMessage(result.warning);
    }
  }, [hydrated, store]);

  useEffect(() => {
    if (activeSession?.status !== 'running') {
      if (timerFrameRef.current) {
        cancelAnimationFrame(timerFrameRef.current);
        timerFrameRef.current = null;
      }
      return;
    }

    const tick = () => {
      setNowMs(Date.now());
      timerFrameRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (timerFrameRef.current) {
        cancelAnimationFrame(timerFrameRef.current);
        timerFrameRef.current = null;
      }
    };
  }, [activeSession?.id, activeSession?.status]);

  useEffect(() => {
    const onVisibilityChange = () => {
      setNowMs(Date.now());
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!activeSession || !shouldCompleteSession(activeSession, nowMs)) {
      return;
    }

    handleCompletion(activeSession, nowMs);
  }, [activeSession, nowMs, store.settings.soundEnabled]);

  const updateStore = (updater: (current: PomodoroStore) => PomodoroStore) => {
    setStore(current => updater(current));
  };

  const handleModeChange = (nextMode: string) => {
    const resolvedMode = nextMode === 'task' ? 'task' : 'simple';
    setMode(resolvedMode);
    setCompletionState(null);
    updateStore(current => ({
      ...current,
      settings: {
        ...current.settings,
        preferredMode: resolvedMode,
      },
    }));
  };

  const handleToggleSession = () => {
    setCompletionState(null);
    setNowMs(Date.now());

    if (activeSession?.status === 'running') {
      updateStore(current => ({
        ...current,
        activeSession: pauseSession(current.activeSession!, Date.now()),
      }));
      return;
    }

    if (activeSession?.status === 'paused') {
      updateStore(current => ({
        ...current,
        activeSession: resumeSession(current.activeSession!, Date.now()),
      }));
      return;
    }

    if (mode === 'task') {
      const task = store.tasks.find(item => item.id === selectedTaskId) ?? null;

      if (!task) {
        setMessage(
          'Task Mode에서는 먼저 작업을 하나 선택하거나 생성해야 합니다.'
        );
        return;
      }

      updateStore(current => ({
        ...current,
        activeSession: createSession({
          mode: 'task',
          title: task.title,
          durationSeconds: task.duration,
          taskId: task.id,
          now: Date.now(),
        }),
      }));
      return;
    }

    const durationSeconds = normalizeDurationSeconds(
      simpleDurationMinutes * 60
    );
    const title = normalizeTitle(simpleTitle, 60) || '집중 타이머';

    updateStore(current => ({
      ...current,
      settings: {
        ...current.settings,
        defaultFocusTime: durationSeconds,
      },
      activeSession: createSession({
        mode: 'simple',
        title,
        durationSeconds,
        now: Date.now(),
      }),
    }));
  };

  const handleReset = () => {
    setCompletionState(null);
    setMessage(null);
    updateStore(current => ({
      ...current,
      activeSession: null,
    }));
  };

  const handleToggleSound = () => {
    updateStore(current => ({
      ...current,
      settings: {
        ...current.settings,
        soundEnabled: !current.settings.soundEnabled,
      },
    }));
  };

  const handleThemeChange = (nextTheme: string) => {
    if (!nextTheme) {
      return;
    }

    updateStore(current => ({
      ...current,
      settings: {
        ...current.settings,
        theme: nextTheme as PomodoroTheme,
      },
    }));
  };

  const handleToggleFullscreen = async () => {
    if (!document.fullscreenEnabled) {
      setMessage('이 브라우저에서는 전체화면을 지원하지 않습니다.');
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await fullscreenRef.current?.requestFullscreen();
    } catch {
      setMessage('전체화면 전환이 거부되었습니다.');
    }
  };

  const handleAddTask = () => {
    const normalized = normalizeTitle(taskTitle, 80);

    if (!normalized) {
      setMessage('작업 이름을 입력해주세요.');
      return;
    }

    const task = createTask(
      normalized,
      taskDurationMinutes,
      store.tasks.length + 1
    );

    updateStore(current => ({
      ...current,
      tasks: [...current.tasks, task],
    }));

    setSelectedTaskId(task.id);
    setTaskTitle('');
    setTaskDurationInput('25');
    setMessage(null);
  };

  const beginEditTask = (task: PomodoroTask) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
    setEditingTaskDurationInput(String(Math.round(task.duration / 60)));
  };

  const saveTaskEdit = () => {
    if (!editingTaskId) {
      return;
    }

    const nextTitle = normalizeTitle(editingTaskTitle, 80);

    if (!nextTitle) {
      setMessage('작업 이름은 비워둘 수 없습니다.');
      return;
    }

    updateStore(current => ({
      ...current,
      tasks: current.tasks.map(task =>
        task.id === editingTaskId
          ? {
              ...task,
              title: nextTitle,
              duration: normalizeDurationSeconds(
                parseDurationMinutesInput(
                  editingTaskDurationInput,
                  Math.round(task.duration / 60)
                ) * 60
              ),
              updatedAt: new Date().toISOString(),
            }
          : task
      ),
    }));

    setEditingTaskId(null);
    setMessage(null);
  };

  const deleteTask = (taskId: string) => {
    updateStore(current => {
      let nextActiveSession = current.activeSession;

      if (current.activeSession?.taskId === taskId) {
        nextActiveSession = {
          ...current.activeSession,
          taskId: null,
          mode: 'simple',
        };
      }

      return {
        ...current,
        activeSession: nextActiveSession,
        tasks: current.tasks.filter(task => task.id !== taskId),
      };
    });

    if (selectedTaskId === taskId) {
      setSelectedTaskId(
        store.tasks.find(task => task.id !== taskId)?.id ?? null
      );
    }

    if (activeSession?.taskId === taskId) {
      setMessage('활성 작업이 삭제되어 일반 타이머로 전환했습니다.');
    }
  };

  const toggleTaskCompleted = (taskId: string, checked: boolean) => {
    updateStore(current => ({
      ...current,
      tasks: current.tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: checked,
              updatedAt: new Date().toISOString(),
            }
          : task
      ),
    }));
  };

  const beginEditRecord = (record: PomodoroRecord) => {
    setEditingRecordId(record.id);
    setEditingRecordTitle(record.title);
  };

  const saveRecordEdit = () => {
    if (!editingRecordId) {
      return;
    }

    updateStore(current => ({
      ...current,
      records: current.records.map(record =>
        record.id === editingRecordId
          ? {
              ...record,
              title: normalizeTitle(editingRecordTitle, 60) || '집중 타이머',
            }
          : record
      ),
    }));

    setEditingRecordId(null);
  };

  const deleteRecord = (recordId: string) => {
    updateStore(current => ({
      ...current,
      records: current.records.filter(record => record.id !== recordId),
    }));

    if (editingRecordId === recordId) {
      setEditingRecordId(null);
      setEditingRecordTitle('');
    }
  };

  const primaryActionLabel =
    activeSession?.status === 'running'
      ? '일시정지'
      : activeSession?.status === 'paused'
        ? '재개'
        : '시작';

  const currentTitle = preview.title;

  return (
    <div className="space-y-8 pb-24 md:pb-8" ref={fullscreenRef}>
      <Card
        className={cn(
          'border-foreground/10 transition-colors',
          themeConfig.surfaceClassName
        )}
      >
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="text-xl">뽀모도로</CardTitle>
              <CardDescription className="mt-1">
                Quick Start로 바로 시작하고, 필요할 때만 Task Mode로 확장합니다.
              </CardDescription>
            </div>
            <div
              className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                themeConfig.statusClassName
              )}
            >
              {statusCopy}
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-white/40 bg-background/70 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">디자인 테마</p>
                <p className={cn('text-xs', themeConfig.mutedTextClassName)}>
                  성격이 다른 4가지 집중 화면을 제공하고, 선택한 테마가 CTA와
                  보조 패널까지 함께 바뀝니다.
                </p>
              </div>
              <Badge variant="outline" className={themeConfig.badgeClassName}>
                {themeConfig.badge}
              </Badge>
            </div>
            <ToggleGroup
              type="single"
              value={store.settings.theme}
              onValueChange={handleThemeChange}
              className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4"
            >
              {themeEntries.map(entry => {
                const isActive = entry.id === store.settings.theme;

                return (
                  <ToggleGroupItem
                    key={entry.id}
                    value={entry.id}
                    aria-label={entry.label}
                    className={cn(
                      'h-auto min-h-[108px] flex-col items-start gap-2 rounded-[1.4rem] border px-4 py-3 text-left transition-all',
                      isActive
                        ? entry.selectorClassName
                        : 'border-border bg-background text-foreground hover:border-primary/30'
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span
                        className={cn(
                          'text-[11px] font-semibold uppercase tracking-[0.18em]',
                          entry.accentTextClassName
                        )}
                      >
                        {entry.patternLabel}
                      </span>
                      {isActive ? (
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                            entry.badgeClassName
                          )}
                        >
                          현재 테마
                        </span>
                      ) : null}
                    </div>
                    <span className="text-sm font-semibold">{entry.label}</span>
                    <span
                      className={cn(
                        'text-xs font-normal leading-relaxed',
                        entry.mutedTextClassName
                      )}
                    >
                      {entry.description}
                    </span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
            <p
              className={cn(
                'text-sm font-medium',
                themeConfig.accentTextClassName
              )}
            >
              {themeConfig.badge}
            </p>
          </div>
          <div
            className={cn(
              'rounded-[1.75rem] p-4 backdrop-blur-sm',
              themeConfig.softPanelClassName,
              themeConfig.heroLayoutClassName
            )}
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div className="space-y-1">
                <p
                  className={cn(
                    'text-sm font-semibold uppercase tracking-[0.18em]',
                    themeConfig.accentTextClassName
                  )}
                >
                  {themeConfig.patternLabel}
                </p>
                <h2 className="text-lg font-semibold tracking-tight">
                  {themeHeroCopy.heading}
                </h2>
                <p
                  className={cn(
                    'max-w-2xl text-sm leading-6',
                    themeConfig.mutedTextClassName
                  )}
                >
                  {themeHeroCopy.body}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  'self-start md:self-auto',
                  themeConfig.badgeClassName
                )}
              >
                {themeConfig.label}
              </Badge>
            </div>
          </div>
          <Tabs
            value={mode}
            onValueChange={handleModeChange}
            className="w-full"
          >
            <TabsList
              className={cn(
                'grid w-full grid-cols-2 rounded-2xl md:max-w-sm',
                themeConfig.tabsListClassName
              )}
            >
              <TabsTrigger
                value="simple"
                className={cn('rounded-xl', themeConfig.tabsTriggerClassName)}
              >
                Quick Start
              </TabsTrigger>
              <TabsTrigger
                value="task"
                className={cn('rounded-xl', themeConfig.tabsTriggerClassName)}
              >
                Task Mode
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
      </Card>

      {message ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,420px)]">
        <Card
          className={cn(
            'overflow-visible transition-colors',
            themeConfig.timerContainerClassName
          )}
        >
          <CardContent className="px-4 py-6">
            <div
              className={cn(
                'flex flex-col items-center',
                themeConfig.heroLayoutClassName
              )}
            >
              <div
                className={cn(
                  'relative flex w-full items-center justify-center',
                  store.settings.theme === 'minimal'
                    ? 'max-w-[440px]'
                    : store.settings.theme === 'visual'
                      ? 'max-w-[372px]'
                      : store.settings.theme === 'garden'
                        ? 'max-w-[360px]'
                        : 'max-w-[388px]'
                )}
              >
                {store.settings.theme === 'minimal' ? (
                  <div className="w-full rounded-[1.75rem] border border-sky-200/80 bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)] px-10 py-10 shadow-[0_18px_40px_rgba(14,165,233,0.08)]">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700/70">
                          Focus Minimal
                        </p>
                        <p className="text-sm text-slate-600">{currentTitle}</p>
                      </div>
                      <div className="space-y-4">
                        <p
                          className={cn(
                            'text-6xl font-semibold tracking-tight text-slate-950 sm:text-7xl',
                            completionState && 'text-orange-500'
                          )}
                          aria-live="polite"
                        >
                          {formatCountdown(displayRemainingMs)}
                        </p>
                        <div className="space-y-3">
                          <div className="h-5 rounded-full bg-slate-200/90">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8_0%,#2563eb_100%)] shadow-[0_0_20px_rgba(56,189,248,0.22)] transition-[width] duration-300"
                              style={{
                                width: `${Math.max(
                                  8,
                                  Math.min(
                                    100,
                                    totalMs > 0
                                      ? ((totalMs - displayRemainingMs) /
                                          totalMs) *
                                          100
                                      : 0
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                          <p
                            className={cn(
                              'inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]',
                              themeConfig.timerDurationClassName
                            )}
                          >
                            {preview.durationLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : store.settings.theme === 'visual' ? (
                  <>
                    <PomodoroCanvas
                      remainingMs={displayRemainingMs}
                      totalMs={Math.max(totalMs, 1)}
                      status={visualStatus}
                      theme={store.settings.theme}
                    />
                    <div className="pointer-events-none absolute inset-0">
                      <p
                        className={cn(
                          'absolute left-1/2 top-4 -translate-x-1/2 rounded-full border px-4 py-1.5 text-sm font-semibold',
                          themeConfig.timerTitleClassName
                        )}
                      >
                        {currentTitle}
                      </p>
                      <p
                        className={cn(
                          'absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl',
                          completionState && 'text-orange-500'
                        )}
                        aria-live="polite"
                      >
                        {formatCountdown(displayRemainingMs)}
                      </p>
                      <p
                        className={cn(
                          'absolute left-1/2 top-[62%] -translate-x-1/2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-[0.12em]',
                          themeConfig.timerDurationClassName
                        )}
                      >
                        {preview.durationLabel}
                      </p>
                    </div>
                  </>
                ) : store.settings.theme === 'garden' ? (
                  <div className="flex w-full flex-col gap-4">
                    <div
                      data-testid="garden-timer-header"
                      className="flex flex-col items-center gap-3 pt-2 text-center"
                    >
                      <p
                        className={cn(
                          'rounded-full border px-4 py-1.5 text-sm font-semibold',
                          themeConfig.timerTitleClassName
                        )}
                      >
                        {currentTitle}
                      </p>
                      <p
                        className={cn(
                          'text-5xl font-semibold tracking-tight sm:text-6xl',
                          completionState && 'text-orange-500'
                        )}
                        aria-live="polite"
                      >
                        {formatCountdown(displayRemainingMs)}
                      </p>
                      <p
                        className={cn(
                          'mt-3 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]',
                          themeConfig.timerDurationClassName
                        )}
                      >
                        {preview.durationLabel}
                      </p>
                    </div>
                    <div
                      data-testid="garden-growth-scene"
                      className="flex w-full items-center justify-center rounded-[1.75rem] border border-emerald-100/80 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),rgba(236,253,245,0.86))] px-3 pb-2 pt-1"
                    >
                      <PomodoroCanvas
                        remainingMs={displayRemainingMs}
                        totalMs={Math.max(totalMs, 1)}
                        status={visualStatus}
                        theme={store.settings.theme}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <PomodoroCanvas
                      remainingMs={displayRemainingMs}
                      totalMs={Math.max(totalMs, 1)}
                      status={visualStatus}
                      theme={store.settings.theme}
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p
                        className={cn(
                          'rounded-full border px-4 py-1.5 text-sm font-semibold',
                          themeConfig.timerTitleClassName
                        )}
                      >
                        {currentTitle}
                      </p>
                      <p
                        className={cn(
                          'mt-2 text-5xl font-semibold tracking-tight sm:text-6xl',
                          completionState && 'text-orange-500'
                        )}
                        aria-live="polite"
                      >
                        {formatCountdown(displayRemainingMs)}
                      </p>
                      <p
                        className={cn(
                          'mt-4 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]',
                          themeConfig.timerDurationClassName
                        )}
                      >
                        {preview.durationLabel}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div
                className={cn(
                  'grid w-full gap-2',
                  themeConfig.controlRowClassName
                )}
              >
                <Button
                  onClick={handleToggleSession}
                  size="lg"
                  className={cn(
                    'h-11 sm:col-span-2',
                    themeConfig.primaryButtonClassName
                  )}
                >
                  {activeSession?.status === 'running' ? (
                    <Pause className="mr-1" />
                  ) : (
                    <Play className="mr-1" />
                  )}
                  {primaryActionLabel}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className={cn('h-11', themeConfig.outlineButtonClassName)}
                >
                  <RotateCcw className="mr-1" />
                  리셋
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleFullscreen}
                  className={cn('h-11', themeConfig.outlineButtonClassName)}
                >
                  <Expand className="mr-1" />
                  전체화면
                </Button>
              </div>

              <div className="grid w-full gap-2 sm:grid-cols-2">
                <Button
                  variant="secondary"
                  onClick={handleToggleSound}
                  className={cn('h-11', themeConfig.secondaryButtonClassName)}
                >
                  {store.settings.soundEnabled ? (
                    <Volume2 className="mr-1" />
                  ) : (
                    <VolumeX className="mr-1" />
                  )}
                  사운드 {store.settings.soundEnabled ? '켜짐' : '꺼짐'}
                </Button>
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm leading-6',
                    themeConfig.softPanelClassName
                  )}
                >
                  {activeSession
                    ? '타이머가 진행 중이어도 현재 카운트다운은 유지됩니다. 테마는 바로 바꿔도 됩니다.'
                    : '지금은 대기 상태입니다. 바로 시작하거나 작업을 선택해 리듬을 만들 수 있습니다.'}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {completionState ? (
                  <motion.div
                    key={completionState.record.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="w-full rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 text-orange-500" />
                      <div className="space-y-1">
                        <p className="font-medium">
                          {completionState.record.title || '집중 타이머'} 완료
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {completionState.warning
                            ? '완료됐지만 저장 경고가 있어 기록 확인이 필요합니다.'
                            : '기록에 저장했고, 바로 다음 타이머로 이어갈 수 있습니다.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs
            value={mode}
            onValueChange={handleModeChange}
            className="w-full"
          >
            <TabsContent value="simple" className="mt-0">
              <Card className={themeConfig.subCardClassName}>
                <CardHeader>
                  <CardTitle>Quick Start 설정</CardTitle>
                  <CardDescription className={themeConfig.mutedTextClassName}>
                    기본값으로 바로 시작할 수 있고, 필요할 때만 제목과 시간을
                    조정합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium"
                      htmlFor="pomodoro-simple-title"
                    >
                      타이머 제목
                    </label>
                    <Input
                      id="pomodoro-simple-title"
                      value={simpleTitle}
                      onChange={event => setSimpleTitle(event.target.value)}
                      placeholder="예: 글쓰기, 알고리즘 풀이"
                      maxLength={60}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium"
                      htmlFor="pomodoro-simple-duration"
                    >
                      집중 시간 (분)
                    </label>
                    <Input
                      id="pomodoro-simple-duration"
                      type="number"
                      min={1}
                      max={180}
                      value={simpleDurationInput}
                      onChange={event =>
                        setSimpleDurationInput(event.target.value)
                      }
                    />
                  </div>
                  <p
                    className={cn(
                      'rounded-2xl px-3 py-2 text-sm',
                      themeConfig.softPanelClassName
                    )}
                  >
                    저장된 기본 시간:{' '}
                    {formatDurationLabel(store.settings.defaultFocusTime)}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="task" className="mt-0">
              <Card className={themeConfig.subCardClassName}>
                <CardHeader>
                  <CardTitle>Task Mode</CardTitle>
                  <CardDescription className={themeConfig.mutedTextClassName}>
                    작업을 골라 집중 시간을 연결합니다. 완료 시 체크 상태와
                    기록이 함께 갱신됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_96px_auto]">
                    <Input
                      value={taskTitle}
                      onChange={event => setTaskTitle(event.target.value)}
                      placeholder="새 작업 제목"
                      maxLength={80}
                    />
                    <Input
                      type="number"
                      min={1}
                      max={180}
                      value={taskDurationInput}
                      onChange={event =>
                        setTaskDurationInput(event.target.value)
                      }
                    />
                    <Button
                      onClick={handleAddTask}
                      className={themeConfig.primaryButtonClassName}
                    >
                      추가
                    </Button>
                  </div>

                  {store.tasks.length === 0 ? (
                    <div
                      className={cn(
                        'rounded-2xl border border-dashed px-4 py-5 text-sm',
                        themeConfig.softPanelClassName
                      )}
                    >
                      아직 작업이 없습니다. 위 입력창에서 첫 작업을 만들어 Task
                      Mode를 시작하세요.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {store.tasks.map(task => {
                        const isSelected = task.id === selectedTaskId;
                        const isEditing = task.id === editingTaskId;

                        return (
                          <div
                            key={task.id}
                            className={cn(
                              'rounded-2xl border px-3 py-3 transition-colors',
                              isSelected && themeConfig.selectorClassName
                            )}
                          >
                            {isEditing ? (
                              <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_100px_auto_auto]">
                                <Input
                                  value={editingTaskTitle}
                                  onChange={event =>
                                    setEditingTaskTitle(event.target.value)
                                  }
                                />
                                <Input
                                  type="number"
                                  min={1}
                                  max={180}
                                  value={editingTaskDurationInput}
                                  onChange={event =>
                                    setEditingTaskDurationInput(
                                      event.target.value
                                    )
                                  }
                                />
                                <Button
                                  size="sm"
                                  onClick={saveTaskEdit}
                                  className={themeConfig.primaryButtonClassName}
                                >
                                  <Save className="mr-1" />
                                  저장
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingTaskId(null)}
                                  className={themeConfig.outlineButtonClassName}
                                >
                                  취소
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    checked={task.completed}
                                    onCheckedChange={checked =>
                                      toggleTaskCompleted(
                                        task.id,
                                        checked === true
                                      )
                                    }
                                    aria-label={`${task.title} 완료 여부`}
                                  />
                                  <div>
                                    <p
                                      className={cn(
                                        'font-medium',
                                        task.completed &&
                                          'text-muted-foreground line-through'
                                      )}
                                    >
                                      {task.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDurationLabel(task.duration)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    size="sm"
                                    variant={isSelected ? 'default' : 'outline'}
                                    onClick={() => setSelectedTaskId(task.id)}
                                    className={
                                      isSelected
                                        ? themeConfig.primaryButtonClassName
                                        : themeConfig.outlineButtonClassName
                                    }
                                  >
                                    {isSelected ? '선택됨' : '선택'}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => beginEditTask(task)}
                                    className={
                                      themeConfig.outlineButtonClassName
                                    }
                                  >
                                    <Pencil className="mr-1" />
                                    수정
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteTask(task.id)}
                                    className={
                                      themeConfig.outlineButtonClassName
                                    }
                                  >
                                    <Trash2 className="mr-1" />
                                    삭제
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card
            className={cn('transition-colors', themeConfig.subCardClassName)}
          >
            <CardHeader>
              <CardTitle>최근 기록</CardTitle>
              <CardDescription className={themeConfig.mutedTextClassName}>
                최근 완료한 기록을 브라우저에 저장합니다. 제목은 나중에 수정할
                수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRecords.length === 0 ? (
                <div
                  className={cn(
                    'rounded-2xl border border-dashed px-4 py-5 text-sm',
                    themeConfig.softPanelClassName
                  )}
                >
                  아직 완료한 기록이 없습니다. 한 번 집중을 끝내면 여기에 기록이
                  쌓입니다.
                </div>
              ) : (
                <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                  {recentRecords.map(record => {
                    const isEditing = record.id === editingRecordId;

                    return (
                      <div
                        key={record.id}
                        className={cn(
                          'rounded-2xl border px-3 py-3',
                          themeConfig.softPanelClassName
                        )}
                      >
                        {isEditing ? (
                          <div className="flex flex-col gap-2 md:flex-row">
                            <Input
                              value={editingRecordTitle}
                              onChange={event =>
                                setEditingRecordTitle(event.target.value)
                              }
                            />
                            <Button
                              size="sm"
                              onClick={saveRecordEdit}
                              className={themeConfig.primaryButtonClassName}
                            >
                              <Save className="mr-1" />
                              저장
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0 flex-1">
                              <p
                                className="truncate font-medium"
                                title={record.title || '집중 타이머'}
                              >
                                {record.title || '집중 타이머'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDurationLabel(record.duration)} ·{' '}
                                {new Date(record.completedAt).toLocaleString(
                                  'ko-KR'
                                )}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => beginEditRecord(record)}
                                className={themeConfig.outlineButtonClassName}
                              >
                                <Pencil className="mr-1" />
                                제목 수정
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteRecord(record.id)}
                                className={themeConfig.outlineButtonClassName}
                              >
                                <Trash2 className="mr-1" />
                                삭제
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <PomodoroFAQ />
    </div>
  );
}
