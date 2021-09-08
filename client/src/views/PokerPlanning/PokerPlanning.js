/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import TaskHolder from "../../components/TaskHolder/TaskHolder";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import { changeTask } from "../../redux/PokerPlanning/actions";
import { getTasksByProject } from "../../redux/ManagerView/actions";
import { AiFillSave } from "react-icons/ai";

import styles from "./PokerPlanning.module.css";

const VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"];

const PokerPlanning = () => {
  const sequence = useSelector((state) => state.pokerplanning.sequence);
  const userRole = useSelector((state) => state.viewRouter.userRole);
  const socket = useSelector(({ app }) => app.socket);
  const loggedUser = useSelector(({ app }) => app.loggedUser);
  const { project, tasks } = useSelector(({ managerView }) => managerView);

  const [selectedVote, setSelectedVote] = useState(null);
  const [areForeignCardsVisible, setAreForeignCardsVisible] = useState(false);
  const [room, setRoom] = useState({});
  var [taskFilter, setTaskFilter] = useState({
    input: [],
    select: "less",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskFilter.select === "more") {
      taskFilter.input = taskFilter.input.slice().sort((a, b) => {
        return a.storyPoints < b.storyPoints ? 1 : -1;
      });
    }
    if (taskFilter.select === "less") {
      taskFilter.input = taskFilter.input.slice().sort((a, b) => {
        return b.storyPoints < a.storyPoints ? 1 : -1;
      });
    }
    if (taskFilter.select === "none") {
      taskFilter.input = taskFilter.input.filter((r) => {
        console.log(r.storyPoints);
        return r.storyPoints === null;
      });
    }
  }, [taskFilter]);

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

    socket.on("totalValueSent", (room) => {
      setAreForeignCardsVisible(true);
      setRoom(room);
      socket.emit("changeButtonsState", {
        projectId: project._id,
        value: false,
      });
    });

    // return () => socket.disconnect();
  }, []);

  const handleButtonClick = (value) => {
    console.log("VALUE: ", value);
    setSelectedVote(value);

    socket.emit("changeUserValue", {
      value,
      projectId: project._id,
      user: loggedUser,
    });
  };

  const handleTaskClick = (task) => {
    socket.emit("setTask", { projectId: project._id, task });
    socket.emit("changeButtonsState", { projectId: project._id, value: true });
  };

  const handleResults = () => {
    const valueSet = (
      room.users.reduce((acc, user) => (acc += user.settedValue), 0) /
      room.users.length
    ).toString(); // para evitar que quede un 0 numerico y lo tome como un valor falsy

    console.log("VALUESET: ", valueSet);
    console.log("ROOMUSERS:", room.users);

    socket.emit("totalValue", {
      projectId: project._id,
      valueSet,
    });

    return valueSet;
  };

  const handleSelect = (e) => {
    setTaskFilter({
      ...taskFilter,
      [e.target.name]: e.target.value,
    });

    console.log(taskFilter);
  };

  const handleSaveValue = () => {
    // este callback se va a ejecutar cuando se termine de actualizar la task
    function cb() {
      dispatch(getTasksByProject(project._id));
      socket.emit("taskUpdatedSuccess", { projectId: project._id });
    }

    dispatch(changeTask(room.task._id, room.totalValue, cb));
  };

  const filterTaskList = (e) => {
    console.log(tasks);
    if (tasks) {
      var taskSaver = tasks.filter((value) => {
        return value.title.includes(e.target.value);
      });
    }
    setTaskFilter({ ...taskFilter, [e.target.name]: taskSaver });
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
            style={{ width: "420px", maxHeight: "600px", overflowY: "auto" }}
          >
            <input
              type="text"
              name="input"
              onChange={(e) => filterTaskList(e)}
            />
            <TaskHolder
              taskList={taskFilter.input.length ? taskFilter.input : tasks}
              customHandleClick={handleTaskClick}
              status="Unrated stories"

              // taskList={
              //   room.task
              //     ? tasks.filter((task) => task._id !== room.task._id)
              //     : tasks
              // }
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
        <div>
          {userRole === "scrumMaster" ? (
            <div>
              <div>
                <label>Story Points</label>
              </div>
              <select name="select" onChange={(e) => handleSelect(e)}>
                <option value="less">Less Points</option>
                <option value="more">More Points</option>
                <option value="none">None Points</option>
              </select>
            </div>
          ) : null}
        </div>
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
