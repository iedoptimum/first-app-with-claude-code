import type { Habit, CompletionRecord } from '../../types';
import { HabitCard } from '../HabitCard/HabitCard';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './Dashboard.module.css';

interface DashboardProps {
  habits: Habit[];
  completions: CompletionRecord[];
  todayStr: string;
  getStreak: (habitId: string) => number;
  isCompletedToday: (habitId: string) => boolean;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export function Dashboard({
  habits,
  completions: _completions,
  todayStr: _todayStr,
  getStreak,
  isCompletedToday,
  onToggle,
  onDelete,
}: DashboardProps) {
  if (habits.length === 0) {
    return <EmptyState />;
  }

  const completedCount = habits.filter((h) => isCompletedToday(h.id)).length;

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <span className={styles.summaryCount}>
          {completedCount} / {habits.length}
        </span>
        <span className={styles.summaryLabel}>habits completed today</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(completedCount / habits.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className={styles.list}>
        {habits.map((habit) => (
          <li key={habit.id}>
            <HabitCard
              habit={habit}
              streak={getStreak(habit.id)}
              isCompletedToday={isCompletedToday(habit.id)}
              onToggle={() => onToggle(habit.id)}
              onDelete={() => onDelete(habit.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
