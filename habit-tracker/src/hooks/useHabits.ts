import { useState, useEffect } from 'react';
import type { AppState, Habit, CompletionRecord } from '../types';
import { loadState, saveState } from '../storage';
import { calculateStreak } from '../streaks';
import { getTodayDateStr, pickColor } from '../utils';

export function useHabits() {
  const [state, setState] = useState<AppState>(() => loadState());
  const todayStr = getTodayDateStr();

  useEffect(() => {
    saveState(state);
  }, [state]);

  function addHabit(name: string, emoji: string) {
    const id = crypto.randomUUID();
    const habit: Habit = {
      id,
      name,
      emoji,
      createdAt: todayStr,
      color: pickColor(id),
    };
    setState((prev) => ({ ...prev, habits: [...prev.habits, habit] }));
  }

  function deleteHabit(habitId: string) {
    setState((prev) => ({
      habits: prev.habits.filter((h) => h.id !== habitId),
      completions: prev.completions.filter((c) => c.habitId !== habitId),
    }));
  }

  function toggleCompletion(habitId: string) {
    setState((prev) => {
      const exists = prev.completions.some(
        (c) => c.habitId === habitId && c.date === todayStr
      );
      if (exists) {
        return {
          ...prev,
          completions: prev.completions.filter(
            (c) => !(c.habitId === habitId && c.date === todayStr)
          ),
        };
      }
      const record: CompletionRecord = { habitId, date: todayStr };
      return { ...prev, completions: [...prev.completions, record] };
    });
  }

  function getStreak(habitId: string): number {
    return calculateStreak(habitId, state.completions, todayStr);
  }

  function isCompletedToday(habitId: string): boolean {
    return state.completions.some(
      (c) => c.habitId === habitId && c.date === todayStr
    );
  }

  return {
    habits: state.habits,
    completions: state.completions,
    todayStr,
    addHabit,
    deleteHabit,
    toggleCompletion,
    getStreak,
    isCompletedToday,
  };
}
