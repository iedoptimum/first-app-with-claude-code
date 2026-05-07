import { useState } from 'react';
import { useHabits } from './hooks/useHabits';
import { Header } from './components/Header/Header';
import { AddHabitForm } from './components/AddHabitForm/AddHabitForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { formatDisplayDate } from './utils';
import styles from './App.module.css';

export default function App() {
  const {
    habits,
    completions,
    todayStr,
    addHabit,
    deleteHabit,
    toggleCompletion,
    getStreak,
    isCompletedToday,
  } = useHabits();

  const [showForm, setShowForm] = useState(false);

  function handleAdd(name: string, emoji: string) {
    addHabit(name, emoji);
    setShowForm(false);
  }

  return (
    <>
      <Header todayLabel={formatDisplayDate(todayStr)} />

      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.toolbar}>
            {!showForm && (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
              >
                + Add Habit
              </button>
            )}
          </div>

          {showForm && (
            <AddHabitForm
              onAdd={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          )}

          <Dashboard
            habits={habits}
            completions={completions}
            todayStr={todayStr}
            getStreak={getStreak}
            isCompletedToday={isCompletedToday}
            onToggle={toggleCompletion}
            onDelete={deleteHabit}
          />
        </div>
      </main>
    </>
  );
}
