import styles from './Header.module.css';

interface HeaderProps {
  todayLabel: string;
}

export function Header({ todayLabel }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Habit Tracker</h1>
        <p className={styles.date}>{todayLabel}</p>
      </div>
    </header>
  );
}
