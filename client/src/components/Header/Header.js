import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";

import useTimeAgo from "../../hooks/useTimeAgo";

import styles from "./Header.module.css";

const NOTIFICACIONES_MOCK = [
  {
    _id: 1,
    title: "Proyecto grupal",
    type: "assignedTask",
    timeStamp: 1631645608569,
  },
  {
    _id: 2,
    title: "Poker planning",
    type: "assignedTask",
    timeStamp: 1631645414469,
  },
  {
    _id: 3,
    title: "CSV + Data",
    type: "assignedTask",
    timeStamp: 1631632111469,
  },
];

const mapTypeToText = {
  assignedTask: "You have a new task assigned",
};

const Header = () => {
  const { user = {}, logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const userRole = formatUserRole(
    useSelector((state) => state.viewRouter.userRole)
  );

  return (
    <header className={styles.container}>
      <section className={styles.header}>
        <Link to="/home" className="unstyled-link">
          Scrum.io
        </Link>
      </section>
      <div className={styles.user}>
        <div className={styles.notificationContainer}>
          <button
            onBlur={() => setIsNotificationsOpen(false)}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`${styles.notificationsButton} ${
              isNotificationsOpen && styles.notificationsActive
            }`}
          >
            <IoMdNotificationsOutline size={24} strokeWidth={8} />
          </button>
          <div
            className={`${styles.notificationsDropdown} ${
              isNotificationsOpen && styles.notificationsDropdownVisible
            }`}
          >
            <header>
              <p>Notifications</p>
            </header>
            <main>
              {NOTIFICACIONES_MOCK.map((notificacion) => (
                <Notification key={notificacion._id} {...notificacion} />
              ))}
            </main>
            <footer className={styles.notificationsFooter}>
              <p>View all</p>
            </footer>
          </div>
        </div>
        <div
          tabIndex="1"
          role="button"
          onBlur={() => setIsMenuOpen(false)}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.userBox} ${isMenuOpen ? styles.visible : null}`}
        >
          <img src={user.picture} alt={user.name} />
          <div className={styles.userInfo}>
            <p>{user.name?.split(" ")[0]}</p>
            {userRole ? <p>{userRole}</p> : ""}
          </div>
          <FiChevronDown size={22} />
          <div className={styles.dropDown}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <div></div>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      </div>
    </header>
  );
};

function Notification({ title, timeStamp, type }) {
  const formattedDate = useTimeAgo(new Date(timeStamp), "short");

  return (
    <article className={styles.notification}>
      <div className={styles.notificationTitle}>
        <p>{title}</p>
        <p>{formattedDate}</p>
      </div>
      <main className={styles.notificationBody}>
        <p>{mapTypeToText[type]}</p>
      </main>
    </article>
  );
}

const formatUserRole = (role) => {
  if (role) return role === "scrumMaster" ? "Scrum master" : "Developer";

  return null;
};

export default Header;
