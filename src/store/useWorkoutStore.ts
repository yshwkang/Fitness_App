import { create } from 'zustand';
import { ExerciseLog, initialExerciseLogs } from '../data/mockData';

type WorkoutState = {
  exercises: ExerciseLog[];
  condition: number | null;
  memo: string;
  toggleSetDone: (exerciseId: string, setId: string) => void;
  addSet: (exerciseId: string) => void;
  setCondition: (value: number) => void;
  setMemo: (value: string) => void;
  resetWorkout: () => void;
};

export const useWorkoutStore = create<WorkoutState>((set) => ({
  exercises: initialExerciseLogs,
  condition: null,
  memo: '',

  toggleSetDone: (exerciseId, setId) =>
    set((state) => ({
      exercises: state.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((s) =>
                s.id === setId ? { ...s, done: !s.done } : s
              ),
            }
      ),
    })),

  addSet: (exerciseId) =>
    set((state) => ({
      exercises: state.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) return exercise;
        const last = exercise.sets[exercise.sets.length - 1];
        const nextSet = (last?.set ?? 0) + 1;
        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              id: `${exerciseId}-${nextSet}-${exercise.sets.length}`,
              set: nextSet,
              kg: last?.kg ?? 0,
              reps: last?.reps ?? 0,
              done: false,
            },
          ],
        };
      }),
    })),

  setCondition: (value) => set({ condition: value }),
  setMemo: (value) => set({ memo: value }),

  resetWorkout: () =>
    set({ exercises: initialExerciseLogs, condition: null, memo: '' }),
}));
