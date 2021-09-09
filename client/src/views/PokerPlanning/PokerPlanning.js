/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import TaskHolder from "../../components/TaskHolder/TaskHolder";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import { changeTask } from "../../redux/PokerPlanning/actions";
import { getTasksByProject } from "../../redux/ManagerView/actions";
import { AiFillSave, AiOutlineDisconnect, AiOutlineCloseCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";

import styles from "./PokerPlanning.module.css";

const VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"];

const PokerPlanning = () => {
  const history = useHistory();
  const sequence = useSelector((state) => state.pokerplanning.sequence);
  const userRole = useSelector((state) => state.viewRouter.userRole);
  const socket = useSelector(({ app }) => app.socket);
  const loggedUser = useSelector(({ app }) => app.loggedUser);
  const { project, tasks } = useSelector(({ managerView }) => managerView);

  const [selectedVote, setSelectedVote] = useState(null);
  const [areForeignCardsVisible, setAreForeignCardsVisible] = useState(false);
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

    socket.on("buttonsStateChanged", (room) => {
      setRoom(room);
    });

    socket.on("resetGame", (room) => {
      setSelectedVote(null);
      setAreForeignCardsVisible(false);
      setRoom(room);
    });

    socket.on("userDisconnected", (room) => {
      setRoom(room);
    });

    socket.on("totalValueSent", (room) => {
      setAreForeignCardsVisible(true);
      setRoom(room);
      socket.emit("changeButtonsState", {
        projectId: project._id,
        value: false,
      });
    });

    socket.on("roomClosed", () => {
      history.push(`/project/${project._id}`)
    })
  }, []);

  const handleButtonClick = (value) => {
    setSelectedVote(value);

    socket.emit("changeUserValue", {
      value: String(value),
      projectId: project._id,
      user: loggedUser,
    });
  };

  const handleTaskClick = (task) => {
    socket.emit("setTask", { projectId: project._id, task });
    socket.emit("changeButtonsState", { projectId: project._id, value: true });
  };

  const handleResults = () => {
    const valueSet =
      room.users.reduce((acc, { settedValue }) => isNaN(settedValue) ? acc += 0 : acc += Number(settedValue), 0) /
      room.users.length;

    socket.emit("totalValue", {
      projectId: project._id,
      valueSet: String(valueSet),
    });

    return valueSet;
  };

  const handleSaveValue = () => {
    // este callback se va a ejecutar cuando se termine de actualizar la task
    function cb() {
      dispatch(getTasksByProject(project._id));
      socket.emit("taskUpdatedSuccess", { projectId: project._id });
    }

    dispatch(changeTask(room.task._id, room.totalValue, cb));
  };

  const handleDisconnect = () => {
    if(userRole === "developer") {
      if(window.confirm("Are you sure you want to disconnect from this room?")) {
        socket.emit("disconnectUser", { projectId: project._id, user: loggedUser });
        history.push(`/project/${project._id}`)
      }
    } else {
      if(window.confirm("Are you sure you want to close this room for everyone?")) {
        socket.emit("closeRoom", { projectId: project._id })
        history.push(`/project/${project._id}`);
      }
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className="main-heading">{project.projectName}</h1>
        {userRole === "scrumMaster" ? (
          <button onClick={handleDisconnect} className="btn-primary">
            <AiOutlineCloseCircle size={20} /> Close room
          </button>
        ) : (
          <button onClick={handleDisconnect} className="btn-primary">
            <AiOutlineDisconnect size={20} /> Disconnect
          </button>
        )}
      </header>
      <section className={styles.generalBoard}>
        <div className={styles.board}>
          {room.users &&
            room.users.map((u) => (
              <div className={styles.user} key={u._id}>
                <div
                  className={`${styles.userVote} ${
                    u._id !== loggedUser._id &&
                    u.settedValue &&
                    !areForeignCardsVisible &&
                    styles.foreignCard
                  }`}
                >
                  {u._id === loggedUser._id ? (
                    <p>{u.settedValue || "?"}</p>
                  ) : areForeignCardsVisible ? (
                    <p>{u.settedValue}</p>
                  ) : (
                    <p>?</p>
                  )}
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
          <div
            style={{
              width: "420px",
              maxHeight: "500px",
              overflowY: "auto",
              zIndex: "10",
            }}
          >
            <TaskHolder
              customHandleClick={!room.totalValue ? handleTaskClick : () => {}}
              status="Unrated stories"
              taskList={
                room.task
                  ? tasks.filter((task) => task._id !== room.task._id)
                  : tasks
              }
            />
          </div>
        ) : null}
      </section>
      <footer className={styles.footer}>
        <section className={styles.footerInfo}>
          {!room.totalValue && userRole === "scrumMaster" && (
            <button disabled={!room.buttonsEnabled} onClick={handleResults}>
              Show results
            </button>
          )}
          {room.totalValue && (
            <div className={styles.storyPoints}>
              <p>Points</p>
              <p>{room.totalValue}</p>
            </div>
          )}
          {room.totalValue && userRole === "scrumMaster" && (
            <button onClick={handleSaveValue} className={styles.saveButton}>
              <AiFillSave size={20} />
              Save
            </button>
          )}
        </section>
        <section className={styles.buttons}>
          {sequence.map((v) => (
            <button
              key={v}
              className={`${selectedVote === v && styles.active}`}
              onClick={() => handleButtonClick(v)}
              disabled={!room.buttonsEnabled}
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
