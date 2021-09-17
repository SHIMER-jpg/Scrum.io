/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory  } from "react-router";
import useTimeAgo from "../../hooks/useTimeAgo";
import Loading from "../../components/Loading/Loading";
import { getAllNotificationsByUser, markOneNotificationAsReaded } from "../../redux/App/actions";

import styles from "./Notification.module.css";

const mapTypeToText = {
  assignedTask: "You have a new task assigned",
};

const Notification = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.app.loggedUser);
  const allNotifications = useSelector((state) => state.app.allNotifications);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loggedUser &&
      dispatch(getAllNotificationsByUser(loggedUser._id, setIsLoading));
  }, [loggedUser]);

  const handleClick = (notificationId, projectId) => {
    dispatch(markOneNotificationAsReaded(loggedUser._id, notificationId))
    history.push(`/project/${projectId}`);
  }

  return (
    <section className={styles.container}>
      <main className={styles.notificationsContainer}>
        {isLoading ? (
          <div style={{padding: "25px"}}>
            <Loading isCentered={true} />
          </div>
        ) : (
          allNotifications.map((notification) => (
            <NotificationItem key={notification._id} handleClick={handleClick} {...notification} />
          ))
        )}
      </main>
    </section>
  );
};

const NotificationItem = ({ _id, createdAt, readed,  type, projectId: project, handleClick }) => {
  const timeAgo = useTimeAgo(new Date(createdAt), "long");

  return (
    <article onClick={() => handleClick(_id, project._id)} className={`${styles.notificationItem} ${readed && styles.notificationItemReaded}`}>
      <header className={styles.notificationItemHeader}>
        <Link to="/notifications" className="unstyled-link">
          <p>{project.projectName}</p>
        </Link>
        <p>
          {timeAgo}
        </p>
      </header>
      <main className={styles.notificationMain}>
        <p>{mapTypeToText[type] || "No description was provided."}</p>
      </main>
    </article>
  );
};

export default Notification;
