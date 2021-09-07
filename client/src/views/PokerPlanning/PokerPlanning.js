/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import TaskHolder from "../../components/TaskHolder/TaskHolder";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import { changeTask } from "../../redux/PokerPlanning/constants";

import styles from "./PokerPlanning.module.css";

const VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 100, "?"];

const PokerPlanning = () => {
  const userRole = useSelector((state) => state.viewRouter.userRole);
  const socket = useSelector(({ app }) => app.socket);
  const loggedUser = useSelector(({ app }) => app.loggedUser);
  const { project, tasks } = useSelector(({ managerView }) => managerView);

  const [selectedVote, setSelectedVote] = useState(null);
  const [room, setRoom] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("joinPokerPlanningRoom", {
      projectId: project._id,
      user: loggedUser,
    });

    socket.on("valueChanged", (room) => {
      setRoom(room);
    });

    socket.on("userJoined", (room) => {
      setRoom(room);
    });

    socket.on("newTaskSetted", (room) => {
      setRoom(room);
    });

    socket.on("totalValueSent", (room) => {
      console.log(room, "hola soy fede");
      setRoom(room);
    });

    // return () => socket.disconnect();
  }, []);

  const handleButtonClick = (value) => {
    console.log(room);
    setSelectedVote(value);

    socket.emit("changeUserValue", {
      value,
      projectId: project._id,
      user: loggedUser,
    });

    console.log(loggedUser);
  };

  const handleTaskClick = (task) => {
    socket.emit("setTask", { projectId: project._id, task });
  };

  const handleResults = () => {
    var valueSet = 0;

    for (let i = 0; i < room.users.length; i++) {
      valueSet = valueSet + room.users[i].settedValue;
    }
    console.log("hola entre");
    socket.emit("totalValue", {
      projectId: project._id,
      valueSet,
    });

    console.log(project._id);
    dispatch(project._id, valueSet);

    return valueSet;
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className="main-heading">{project.projectName}</h1>
      </header>
      <section className={styles.generalBoard}>
        <div className={styles.board}>
          {room.users &&
            room.users.map((u) => (
              <div className={styles.user} key={u._id}>
                <div className={styles.userVote}>
                  <p>{u.settedValue || "?"}</p>
                </div>
                <div className={styles.userInfo}>
                  <img src={u.picture} alt={u.name} />
                  <p>{u.name?.split(" ")[0]}</p>
                </div>
              </div>
            ))}
          <div className={styles.taskPlace}>
            {room.task ? (
              <TaskCard
                name={room.task.title}
                sp={room.task.storyPoints}
                complex={room.task.priorization}
                description={room.task.details}
              />
            ) : (
              <div className={styles.cardPlaceholder}>
                <p>Waiting for the scrum master to select a task.</p>
              </div>
            )}
          </div>
        </div>
        {userRole === "scrumMaster" ? (
          <div style={{ width: "420px" }}>
            <TaskHolder
              customHandleClick={handleTaskClick}
              status="Unrated stories"
              taskList={tasks}
            />
          </div>
        ) : null}
      </section>
      <footer className={styles.footer}>
        <button onClick={handleResults}>Show results</button>
        <section className={styles.buttons}>
          {VALUES.map((v) => (
            <button
              className={`${selectedVote === v && styles.active}`}
              onClick={() => handleButtonClick(v)}
            >
              {v}
            </button>
          ))}
        </section>
      </footer>
    </section>
  );
};

export default PokerPlanning;
