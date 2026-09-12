import styles from "./Pages.module.css";

function AboutPage() {
  return (
    <main className={styles.page}>
      <h2 className={styles.pageTitle}>About</h2>

      <section className={styles.section}>
        <h3>App Features</h3>
        <p>
          This todo app allows users to create, update, complete, and manage
          their todos.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Technologies Used</h3>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Vite</li>
        </ul>
      </section>
    </main>
  );
}

export default AboutPage;