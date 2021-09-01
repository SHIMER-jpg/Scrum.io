import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";
import { FiChevronDown } from "react-icons/fi";

import styles from "./Header.module.css";

const Header = () => {
  const { user = {}, isLoading, logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.container}>
      <section className={styles.header}>
        <Link to="/home" className="unstyled-link">
          Scrum.io
        </Link>
      </section>
      <div className={styles.user}>
        {isLoading ? (
          <div className={styles.userBox}>
            <Skeleton circle={true} width={35} />
          </div>
        ) : (
          <div
            role="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${styles.userBox} ${
              isMenuOpen ? styles.visible : null
            }`}
          >
            <img src={user.picture} alt={user.name} />
            <div className={styles.userInfo}>
              <p>{user.name?.split(" ")[0]}</p>
              <p>Developer</p>
            </div>
            <FiChevronDown size={22} />
            <div className={styles.dropDown}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <div></div>
              <button onClick={logout}>Log out</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
