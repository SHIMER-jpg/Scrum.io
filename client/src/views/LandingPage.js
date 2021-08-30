import { AiOutlineUser } from "react-icons/ai";

import styles from "../styles/LandingPage.module.css";
import image from "../static/img/stock_image.jpeg";
import logo from "../static/img/scrumio_logo.png";

const LandingPage = () => {
  return (
    <section className={styles.container}>
      <main className={styles.login}>
        <img src={logo} alt="Logo de Scrum.io" />
        <h1>Scrum.io</h1>
        <p>We make IT easy</p>
        <button>
          <AiOutlineUser /> Login
        </button>
      </main>
      <img src={image} alt="Scrum.io" />
    </section>
  );
};

export default LandingPage;
