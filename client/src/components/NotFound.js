import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.container}>
      <main className={styles.notFound}>
        <h1>
          <strong>404:</strong> Not found.
        </h1>
        <button>Go back home</button>
      </main>
    </section>
  );
};

export default NotFound;
