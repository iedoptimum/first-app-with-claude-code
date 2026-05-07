import type { CompletionRecord } from './types';

export function calculateStreak(
  habitId: string,
  completions: CompletionRecord[],
  todayStr: string
): number {
  const completedDates = new Set(
    completions.filter((c) => c.habitId === habitId).map((c) => c.date)
  );

  const today = parseDate(todayStr);
  // Grace period: if today not yet completed, count backward from yesterday
  const anchor = completedDates.has(todayStr) ? today : subtractDays(today, 1);

  let streak = 0;
  let cursor = anchor;

  while (true) {
    const cursorStr = formatDate(cursor);
    if (completedDates.has(cursorStr)) {
      streak++;
      cursor = subtractDays(cursor, 1);
    } else {
      break;
    }
  }

  return streak;
}

function parseDate(str: string): { y: number; m: number; d: number } {
  const [y, m, d] = str.split('-').map(Number);
  return { y, m, d };
}

function subtractDays(
  date: { y: number; m: number; d: number },
  n: number
): { y: number; m: number; d: number } {
  const dt = new Date(date.y, date.m - 1, date.d - n);
  return { y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() };
}

function formatDate(date: { y: number; m: number; d: number }): string {
  return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
}
