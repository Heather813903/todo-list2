import { Link } from "react-router";
import styles from "./Pages.module.css";

function NotFoundPage() {
  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <h2 className={styles.pageTitle}>404 - Page Not Found</h2>

        <p>The page you are looking for does not exist.</p>

        <ul className={styles.linkList}>
          <li>
            <Link to="/">Go Home</Link>
          </li>
          <li>
            <Link to="/todos">Go to Todos</Link>
          </li>
          <li>
            <Link to="/about">Go to About</Link>
          </li>
          <li>
            <Link to="/login">Go to Login</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default NotFoundPage;