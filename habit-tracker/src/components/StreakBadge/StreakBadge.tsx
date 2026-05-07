import styles from './StreakBadge.module.css';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const color =
    streak === 0
      ? '#94a3b8'
      : streak >= 30
      ? '#ef4444'
      : streak >= 7
      ? '#f97316'
      : '#3b82f6';

  const icon = streak >= 7 ? '🔥' : '⚡';

  return (
    <span
      className={styles.badge}
      style={{ backgroundColor: color }}
      title={`${streak}-day streak`}
    >
      {streak > 0 ? icon : '—'} {streak > 0 ? streak : ''}
    </span>
  );
}
