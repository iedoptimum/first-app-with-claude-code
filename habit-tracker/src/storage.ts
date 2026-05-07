import type { AppState } from './types';

const STORAGE_KEY = 'habit-tracker-state';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { habits: [], completions: [] };
    return JSON.parse(raw) as AppState;
  } catch {
    return { habits: [], completions: [] };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
