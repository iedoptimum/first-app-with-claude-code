export interface Habit {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
  color: string;
}

export interface CompletionRecord {
  habitId: string;
  date: string;
}

export interface AppState {
  habits: Habit[];
  completions: CompletionRecord[];
}
