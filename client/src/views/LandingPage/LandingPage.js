import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../components/Logo/Logo.js";
import { AiOutlineUser } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import styles from "./LandingPage.module.css";
import image from "../../static/img/landing_bg.png";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const isDarkMode = useSelector(state => state.app.darkMode);

  return (
    <>
      <Helmet>
        <title>Scrum.io | We make IT easy</title>
      </Helmet>
      <section className={styles.container}>
        <main className={styles.login}>
          <Logo fill={`${isDarkMode ? "#FFFFFF" : "#cc001a"}`} height={80} width={80} />
          <h1>Scrum.io</h1>
          <p>We make IT easy</p>
          <button onClick={loginWithRedirect}>
            <AiOutlineUser /> Login
          </button>
        </main>
        <img src={image} alt="Scrum.io" />
      </section>
    </>
  );
};

export default LandingPage;
