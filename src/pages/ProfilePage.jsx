import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Pages.module.css";

function ProfilePage() {
  const { name, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        const response = await fetch("/api/tasks?limit=100", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todos = data.tasks;

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <main className={styles.page}>
      <h2 className={styles.pageTitle}>Profile</h2>

      <section className={styles.section}>
        <h3>Account Information</h3>
        <p>Name: {name}</p>
        <p>Status: {token ? "Authenticated" : "Not authenticated"}</p>
      </section>

      <section className={styles.section}>
        <h3>Todo Statistics</h3>

        {loading && <p className={styles.loading}>Loading statistics...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && (
          <>
            <p>Total Todos: {todoStats.total}</p>
            <p>Completed Todos: {todoStats.completed}</p>
            <p>Active Todos: {todoStats.active}</p>

            {todoStats.total > 0 && <p>Completion: {completionPercentage}%</p>}
          </>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;