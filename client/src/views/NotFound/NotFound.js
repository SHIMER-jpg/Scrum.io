import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.container}>
      <main className={styles.notFound}>
        <Logo fill="#fff" width={100} height={100} />
        <h1>
          <strong>404:</strong> Not found.
        </h1>
        <Link className="unstyled-link" to="/">
          <button>Go back home</button>
        </Link>
      </main>
    </section>
  );
};

export default NotFound;
