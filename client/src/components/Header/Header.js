import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiChevronDown } from "react-icons/fi";
import { ImFileEmpty } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMoon } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import useTimeAgo from "../../hooks/useTimeAgo";
import {
  markNotificationsAsReaded,
  markOneNotificationAsReaded,
  setDarkMode,
} from "../../redux/App/actions";

import styles from "./Header.module.css";

const mapTypeToText = {
  assignedTask: "You have a new task assigned",
  ad: "Your scrum master has written an important ad.",
  assignedProject: "You have been assigned to a new project."
};

const Header = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const history = useHistory();
  const user = useSelector((state) => state.app.loggedUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    Boolean(localStorage.getItem("darkMode"))
  );

  const notifications = useSelector(({ app }) => app.notifications);
  const unreadNotifications = notifications.filter((n) => !n.readed);

  const userRole = formatUserRole(
    useSelector((state) => state.viewRouter.userRole)
  );

  const handleReadNotifications = () => {
    // dispatch al backend
    // notifications.forEach((n) => (n.readed = true));
    dispatch(markNotificationsAsReaded(user._id));
  };

  const handleNotificationClick = (notificationId, projectId) => {
    dispatch(markOneNotificationAsReaded(user._id, notificationId));
    history.push({
      pathname: `/project/${projectId}`,
      state: { projectId },
    });
  };

  const handleFooterClick = () => {
    history.push({
      pathname: "/myProfile",
      state: { redirectSelectedTab: "notifications" },
    });
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode")) {
      setIsDarkMode(true);
      dispatch(setDarkMode(true));
      localStorage.setItem("darkMode", "true");
    } else {
      setIsDarkMode(false);
      dispatch(setDarkMode(false));
      localStorage.removeItem("darkMode");
    }
  };

  return (
    <header className={styles.container}>
      <section className={styles.header}>
        <Link to="/home" className="unstyled-link">
          Scrum.io
        </Link>
      </section>
      <div className={styles.user}>
        <button onClick={toggleDarkMode} className={styles.darkModeButton}>
          {!isDarkMode ? <BiMoon size={22} /> : <FiSun size={22} />}
        </button>
        <div className={styles.notificationContainer}>
          <button
            onBlur={() => setIsNotificationsOpen(false)}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`${styles.notificationsButton} ${
              isNotificationsOpen && styles.notificationsActive
            } ${unreadNotifications.length && styles.notificationsCount}`}
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
              {notifications.length ? (
                <p onClick={handleReadNotifications}>Mark all as readed</p>
              ) : null}
            </header>
            <main>
              {notifications.length ? (
                notifications.map((notification) => (
                  <Notification
                    handleNotificationClick={handleNotificationClick}
                    key={notification._id}
                    {...notification}
                  />
                ))
              ) : (
                <div className={styles.noNotifications}>
                  <ImFileEmpty size={24} />
                  <p>Nothing to see here yet...</p>
                </div>
              )}
            </main>
            <footer
              onClick={handleFooterClick}
              className={styles.notificationsFooter}
            >
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

function Notification({
  _id,
  createdAt,
  type,
  projectId: project,
  handleNotificationClick,
}) {
  const timeAgo = useTimeAgo(new Date(createdAt), "short");

  return (
    <article
      onClick={() => handleNotificationClick(_id, project._id)}
      className={styles.notification}
    >
      <div className={styles.notificationTitle}>
        <p>{project?.projectName}</p>
        <p>{timeAgo}</p>
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
