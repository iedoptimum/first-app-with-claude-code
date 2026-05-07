import type { Habit } from '../../types';
import { StreakBadge } from '../StreakBadge/StreakBadge';
import styles from './HabitCard.module.css';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  isCompletedToday: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function HabitCard({
  habit,
  streak,
  isCompletedToday,
  onToggle,
  onDelete,
}: HabitCardProps) {
  return (
    <div
      className={`${styles.card} ${isCompletedToday ? styles.completed : ''}`}
      style={{ borderLeftColor: habit.color }}
    >
      <button
        className={styles.toggle}
        onClick={onToggle}
        aria-pressed={isCompletedToday}
        aria-label={isCompletedToday ? 'Mark incomplete' : 'Mark complete'}
        style={{ borderColor: habit.color, color: isCompletedToday ? '#fff' : habit.color, backgroundColor: isCompletedToday ? habit.color : 'transparent' }}
      >
        {isCompletedToday ? '✓' : ''}
      </button>

      <span className={styles.emoji}>{habit.emoji}</span>

      <span className={styles.name}>{habit.name}</span>

      <div className={styles.right}>
        <StreakBadge streak={streak} />
        <button
          className={styles.delete}
          onClick={onDelete}
          aria-label={`Delete habit: ${habit.name}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
