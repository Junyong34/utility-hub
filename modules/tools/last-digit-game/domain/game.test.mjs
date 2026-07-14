import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateRankedUsers,
  calculateScore,
  canStart,
  canStop,
  createGameUsers,
  createInitialGameStateFromProfiles,
  createPlayerProfiles,
  formatStopwatchTime,
  parseSecondDigit,
  startLastDigitGameAttempt,
  stopLastDigitGameAttempt,
} from './game.ts';

const PROFILES = [
  {
    name: '가',
    color: 'from-red-500 to-pink-500',
    label: '첫 번째',
  },
  {
    name: '나',
    color: 'from-blue-500 to-cyan-500',
    label: '두 번째',
  },
];

test('스톱워치 표시와 점수는 음수를 0으로 보정하고 두 기록의 끝자리를 곱한다', () => {
  assert.deepEqual(
    {
      negative: formatStopwatchTime(-1),
      minuteBoundary: formatStopwatchTime(61_239),
      parsed: parseSecondDigit('01:01:23'),
      malformed: parseSecondDigit('not-a-time'),
      score: calculateScore('00:00:03', '00:00:07'),
    },
    {
      negative: '00:00:00',
      minuteBoundary: '01:01:23',
      parsed: 3,
      malformed: 0,
      score: 21,
    }
  );
});

test('참가자 생성은 기본 5명과 1~15명 제한을 유지한다', () => {
  assert.deepEqual(
    {
      invalidProfileCount: createPlayerProfiles(Number.NaN).length,
      lowerBound: createPlayerProfiles(0).length,
      upperBound: createPlayerProfiles(99).length,
      emptyGame: createGameUsers(0),
      cappedGameCount: createGameUsers(99).length,
    },
    {
      invalidProfileCount: 5,
      lowerBound: 1,
      upperBound: 15,
      emptyGame: [],
      cappedGameCount: 15,
    }
  );
});

test('각 참가자는 두 번의 기록을 끝낸 후 다음 참가자로 넘어간다', () => {
  let state = createInitialGameStateFromProfiles(PROFILES);

  assert.equal(canStart(state), true);
  state = startLastDigitGameAttempt(state);
  assert.deepEqual(
    {
      currentUserIndex: state.currentUserIndex,
      isRunning: state.isRunning,
      phase: state.phase,
      status: state.users[0]?.status,
    },
    {
      currentUserIndex: 0,
      isRunning: true,
      phase: 'readyToFirstStop',
      status: 'playing',
    }
  );
  assert.equal(canStop(state), true);

  const firstStop = stopLastDigitGameAttempt(state, '00:00:03', 100);
  state = firstStop.state;
  assert.deepEqual(
    {
      phase: state.phase,
      isRunning: state.isRunning,
      times: state.users[0]?.times,
      completedUserId: firstStop.completedUserId,
      isGameComplete: firstStop.isGameComplete,
    },
    {
      phase: 'readyToSecondStart',
      isRunning: false,
      times: ['00:00:03'],
      completedUserId: null,
      isGameComplete: false,
    }
  );

  state = startLastDigitGameAttempt(state);
  const secondStop = stopLastDigitGameAttempt(state, '00:00:07', 200);
  state = secondStop.state;

  assert.deepEqual(
    {
      phase: state.phase,
      score: state.users[0]?.score,
      status: state.users[0]?.status,
      finishedAt: state.users[0]?.finishedAt,
      completedUserId: secondStop.completedUserId,
      isGameComplete: secondStop.isGameComplete,
      isNewLeader: secondStop.isNewLeader,
    },
    {
      phase: 'readyToNext',
      score: 21,
      status: 'done',
      finishedAt: 200,
      completedUserId: 1,
      isGameComplete: false,
      isNewLeader: true,
    }
  );

  state = startLastDigitGameAttempt(state);
  assert.deepEqual(
    {
      currentUserIndex: state.currentUserIndex,
      phase: state.phase,
      status: state.users[1]?.status,
    },
    {
      currentUserIndex: 1,
      phase: 'readyToFirstStop',
      status: 'playing',
    }
  );
});

test('마지막 참가자의 2회차를 저장하면 결과 상태로 전환한다', () => {
  let state = createInitialGameStateFromProfiles([PROFILES[0]]);
  state = startLastDigitGameAttempt(state);
  state = stopLastDigitGameAttempt(state, '00:00:02', 100).state;
  state = startLastDigitGameAttempt(state);

  const transition = stopLastDigitGameAttempt(state, '00:00:04', 200);

  assert.deepEqual(
    {
      phase: transition.state.phase,
      isRunning: transition.state.isRunning,
      score: transition.state.users[0]?.score,
      completedUserId: transition.completedUserId,
      isGameComplete: transition.isGameComplete,
    },
    {
      phase: 'result',
      isRunning: false,
      score: 8,
      completedUserId: 1,
      isGameComplete: true,
    }
  );
});

test('완료 순위는 점수 내림차순이고 동점은 먼저 완료한 참가자가 앞선다', () => {
  const users = createGameUsers(3, [
    ...PROFILES,
    { name: '다', color: 'from-green-500 to-lime-500', label: '세 번째' },
  ]);
  const ranked = calculateRankedUsers([
    { ...users[0], times: ['00:00:03', '00:00:03'], status: 'done', finishedAt: 200 },
    { ...users[1], times: ['00:00:01', '00:00:09'], status: 'done', finishedAt: 100 },
    users[2],
  ]);

  assert.deepEqual(
    ranked.map(({ id, score, rank, status }) => ({ id, score, rank, status })),
    [
      { id: 2, score: 9, rank: 1, status: 'done' },
      { id: 1, score: 9, rank: 2, status: 'done' },
      { id: 3, score: 0, rank: 3, status: 'waiting' },
    ]
  );
});
