import { useState } from 'react';
import styles from './AddHabitForm.module.css';

interface AddHabitFormProps {
  onAdd: (name: string, emoji: string) => void;
  onCancel: () => void;
}

export function AddHabitForm({ onAdd, onCancel }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, emoji.trim() || '✅');
    setName('');
    setEmoji('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <input
          className={styles.nameInput}
          type="text"
          placeholder="Habit name (e.g. Read 30 minutes)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <input
          className={styles.emojiInput}
          type="text"
          placeholder="✅"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          maxLength={2}
          aria-label="Emoji (optional)"
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn}>
          Add Habit
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
