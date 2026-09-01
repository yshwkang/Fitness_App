export type SetRecord = {
  id: string;
  set: number;
  kg: number;
  reps: number;
  done: boolean;
};

export type ExerciseLog = {
  id: string;
  name: string;
  sets: SetRecord[];
};

export const todayWorkout = {
  bodyPart: '등 · 이두',
  estimatedMinutes: 50,
  exerciseCount: 5,
};

export const initialExerciseLogs: ExerciseLog[] = [
  {
    id: 'lat-pulldown',
    name: '랫풀다운',
    sets: [
      { id: 'lp-1', set: 1, kg: 40, reps: 12, done: true },
      { id: 'lp-2', set: 2, kg: 45, reps: 10, done: true },
      { id: 'lp-3', set: 3, kg: 45, reps: 10, done: false },
    ],
  },
  {
    id: 'seated-row',
    name: '시티드 로우',
    sets: [
      { id: 'sr-1', set: 1, kg: 40, reps: 12, done: false },
      { id: 'sr-2', set: 2, kg: 40, reps: 12, done: false },
    ],
  },
];

export const weeklyProgress = {
  completed: 2,
  total: 3,
  days: [
    { label: '월', done: true },
    { label: '화', done: false },
    { label: '수', done: true },
    { label: '목', done: false },
    { label: '금', done: false },
    { label: '토', done: false },
    { label: '일', done: false },
  ],
};

export const recentRecords = [
  { id: 'r1', title: '등 운동', date: '8/26', volume: 4820 },
  { id: 'r2', title: '하체 운동', date: '8/24', volume: 5210 },
];

export const volumeTrend = [
  { label: '1주', value: 4200 },
  { label: '2주', value: 4800 },
  { label: '3주', value: 4500 },
  { label: '4주', value: 5240 },
];

export const bodyPartRatio = [
  { label: '등', percent: 35, color: 'back' as const },
  { label: '하체', percent: 30, color: 'legs' as const },
  { label: '가슴', percent: 20, color: 'chest' as const },
  { label: '기타', percent: 15, color: 'etc' as const },
];
