import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>📋</div>
      <p className={styles.heading}>No habits yet</p>
      <p className={styles.sub}>Add your first habit above to get started.</p>
    </div>
  );
}
