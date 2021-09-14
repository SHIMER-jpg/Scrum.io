/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AiOutlineDisconnect,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { Redirect, useParams } from "react-router-dom";

import TaskHolder from "../../components/TaskHolder/TaskHolder";
import TaskCard from "../../components/TaskCard/TaskCard";
import { changeTask } from "../../redux/PokerPlanning/actions";
import { getTasksByProject } from "../../redux/ManagerView/actions";
import Loading from "../../components/Loading/Loading"

import styles from "./PokerPlanning.module.css";

const PokerPlanning = () => {
  const history = useHistory();
  const sequence = useSelector((state) => state.pokerplanning.sequence);
  const userRole = useSelector((state) => state.viewRouter.userRole);
  const socket = useSelector(({ app }) => app.socket);
  const loggedUser = useSelector(({ app }) => app.loggedUser);
  const { project, tasks } = useSelector(({ managerView }) => managerView);
  const { projectId } = useParams();

  const [room, setRoom] = useState({});
  const [selectedVote, setSelectedVote] = useState(null);
  const [areForeignCardsVisible, setAreForeignCardsVisible] = useState(false);
  const [saveTask, setSaveTask] = useState(tasks);
  const [isRoomInitialized, setIsRoomInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  var [taskFilter, setTaskFilter] = useState({
    input: "",
    select: undefined,
    showNoValueTask: undefined,
    selectComplex: undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    var filteredTasks = tasks;
    if (typeof taskFilter.selectComplex === "function") {
      filteredTasks = filteredTasks.filter(taskFilter.selectComplex);
    }
    if (typeof taskFilter.showNoValueTask === "function") {
      filteredTasks = filteredTasks.filter(taskFilter.showNoValueTask);
    }
    if (typeof taskFilter.select === "function") {
      filteredTasks = filteredTasks.slice().sort(taskFilter.select);
    }
    if (taskFilter.input.trim() !== "") {
      filteredTasks = filteredTasks.filter((r) =>
        r.title
          .trim()
          .toLowerCase()
          .includes(taskFilter.input.trim().toLowerCase())
      );
    } else {
      setSaveTask(tasks);
    }

    setSaveTask(filteredTasks);
  }, [taskFilter, tasks]);

  useEffect(() => {
    socket.emit("joinPokerPlanningRoom", {
      projectId: project._id,
      user: { ...loggedUser, userRole },
    });

    if (isRoomInitialized) {
      socket.on("updateRoom", (room) => {
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
        history.push(`/project/${project._id}`);
      });
    }
  }, [isRoomInitialized]);

  useEffect(() => {
    socket.on("roomInitialized", () => {
      setIsRoomInitialized(true);
      setIsLoading(false)
    });

    socket.on("roomUninitialized", () => {
      setIsRoomInitialized(false);
      setIsLoading(false)
    });
  }, []);

  const handleInitRoom = () => {
    socket.emit("createRoom", {
      projectId: project._id,
      user: { ...loggedUser, userRole },
    });
  };

  useEffect(() => {
    const userInRoom = room?.users?.find((u) => u._id === loggedUser._id);
    userInRoom &&
      !selectedVote &&
      setSelectedVote(Number(userInRoom.settedValue));
  }, [room?.users]);

  const handleButtonClick = (value) => {
    setSelectedVote(value);

    socket.emit("changeUserValue", {
      value: String(value),
      projectId: project._id,
      user: loggedUser,
    });
  };

  if (!project._id) {
    return <Redirect to={`/project/${projectId}`} />;
  }

  const handleTaskClick = (task) => {
    socket.emit("setTask", { projectId: project._id, task });
    socket.emit("changeButtonsState", { projectId: project._id, value: true });
  };

  const handleResults = () => {
    const valueSet =
      room.users
        .filter((u) => u.userRole !== "scrumMaster")
        .reduce(
          (acc, { settedValue }) =>
            isNaN(settedValue) ? (acc += 0) : (acc += Number(settedValue)),
          0
        ) / room.users.filter((u) => u.userRole !== "scrumMaster").length ||
      "0";

    socket.emit("totalValue", {
      projectId: project._id,
      valueSet: String(valueSet),
    });

    return valueSet;
  };

  const handleSelect = (e) => {
    var sortCb = undefined;
    var filterNull = undefined;
    if (e.target.value === "more") {
      sortCb = (a, b) => {
        return a.storyPoints < b.storyPoints ? 1 : -1;
      };
    }
    if (e.target.value === "less") {
      sortCb = (a, b) => {
        return b.storyPoints < a.storyPoints ? 1 : -1;
      };
    }
    if (e.target.value === "none") {
      filterNull = (a) => {
        return a.storyPoints === null;
      };
    }

    setTaskFilter({
      ...taskFilter,
      [e.target.name]: sortCb,
      showNoValueTask: filterNull,
    });
  };

  const handleSaveValue = (property) => {
    function cb() {
      dispatch(getTasksByProject(project._id));
      socket.emit("taskUpdatedSuccess", { projectId: project._id });
    }

    dispatch(changeTask(room.task._id, room[property], cb));
  };

  const handleDisconnect = () => {
    if (userRole === "developer") {
      if (
        window.confirm("Are you sure you want to disconnect from this room?")
      ) {
        socket.emit("disconnectUser", {
          projectId: project._id,
          user: loggedUser,
        });
        history.push(`/project/${project._id}`);
      }
    } else {
      if (
        window.confirm("Are you sure you want to close this room for everyone?")
      ) {
        socket.emit("closeRoom", { projectId: project._id });
        history.push(`/project/${project._id}`);
      }
    }
  };

  const filterTaskList = (e) => {
    setTaskFilter({ ...taskFilter, [e.target.name]: e.target.value });
  };

  const handleComplexity = (e) => {
    var filterCb;

    if (e.target.value === "All Tasks") {
      filterCb = (e) => {
        return e;
      };
    }

    if (e.target.value === "Easy Win") {
      filterCb = (e) => {
        return e.priorization === "Easy Win";
      };
    }

    if (e.target.value === "Deprioritize") {
      filterCb = (e) => {
        return e.priorization === "Deprioritize";
      };
    }

    if (e.target.value === "Worth Pursuing") {
      filterCb = (e) => {
        return e.priorization === "Worth Pursuing";
      };
    }

    if (e.target.value === "Strategic Initiative") {
      filterCb = (e) => {
        return e.priorization === "Strategic Initiative";
      };
    }

    setTaskFilter({
      ...taskFilter,
      [e.target.name]: filterCb,
    });
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className="main-heading">{project.projectName}</h1>
        {isRoomInitialized ? (
          userRole === "scrumMaster" ? (
            <button onClick={handleDisconnect} className="btn-primary">
              <AiOutlineCloseCircle size={20} /> Close room
            </button>
          ) : (
            <button onClick={handleDisconnect} className="btn-primary">
              <AiOutlineDisconnect size={20} /> Disconnect
            </button>
          )
        ) : null}
      </header>
      {isLoading ? (
        <Loading />
      ) : !isRoomInitialized ? (
        <div className={styles.initRoom}>
          <div>
            <p>This planning poker room hasn't been initialized yet.</p>
            {userRole === "scrumMaster" && (
              <button className="btn-primary" onClick={handleInitRoom}>
                Initialize room
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <section>
            <div className={styles.scrumMasterSection}>
              {room?.users?.find((u) => u.userRole === "scrumMaster") && (
                <>
                  <p>Scrum manager</p>
                  <div>
                    <img
                      src={
                        room?.users?.find((u) => u.userRole === "scrumMaster")
                          .picture
                      }
                      alt="Scrum master"
                    />
                    <p>
                      {`${
                        room?.users?.find((u) => u.userRole === "scrumMaster")
                          .name
                      } ${userRole === "scrumMaster" ? "(you)." : ""}`}
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
          <section className={styles.generalBoard}>
            <div className={styles.board}>
              {room.users &&
                room.users
                  .filter((u) => u.userRole === "developer")
                  .map((u) => (
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
              <div className={styles.sidebar} style={{ width: "450px" }}>
                <div className={styles.filterTaskInput}>
                  <input
                    type="text"
                    name="input"
                    onChange={(e) => filterTaskList(e)}
                    placeholder="Filter tasks by name..."
                    autoComplete="off"
                  />
                </div>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <TaskHolder
                    taskList={saveTask}
                    customHandleClick={
                      !room.totalValue ? handleTaskClick : () => {}
                    }
                    hiddenStatus={true}
                    fixedHeight={true}
                  />
                </div>
                <div className={styles.filters}>
                  <div className={styles.filter}>
                    <label>Story Points</label>
                    <select
                      id="fede"
                      name="select"
                      onChange={(e) => handleSelect(e)}
                    >
                      <option value="less">Less Points</option>
                      <option value="more">More Points</option>
                      <option value="none">None Points</option>
                    </select>
                  </div>
                  <div className={styles.filter}>
                    <label htmlFor="selectComplex">Complexity</label>
                    <select
                      id="selectComplex"
                      name="selectComplex"
                      onChange={(e) => handleComplexity(e)}
                    >
                      <option value="All Tasks">All Tasks</option>
                      <option value="Easy Win">Easy Win</option>
                      <option value="Deprioritize">Deprioritize</option>
                      <option value="Worth Pursuing">Worth Pursuing</option>
                      <option value="Strategic Initiative">
                        Strategic Initiative
                      </option>
                    </select>
                  </div>
                </div>
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
              <div className={styles.footerInfoScores}>
                {room.minValue ? (
                  <div
                    onClick={
                      userRole === "scrumMaster" &&
                      (() => handleSaveValue("minValue"))
                    }
                    className={`${styles.storyPoints} ${
                      userRole === "scrumMaster" && styles.storyPointsHovereable
                    }`}
                  >
                    <p>Minimum value</p>
                    <p>{room.minValue}</p>
                  </div>
                ) : null}
                {room.totalValue ? (
                  <div
                    onClick={
                      userRole === "scrumMaster" &&
                      (() => handleSaveValue("totalValue"))
                    }
                    className={`${styles.storyPoints} ${
                      userRole === "scrumMaster" && styles.storyPointsHovereable
                    }`}
                  >
                    <p>Average points</p>
                    <p>{room.totalValue}</p>
                  </div>
                ) : null}
                {room.maxValue ? (
                  <div
                    onClick={
                      userRole === "scrumMaster" &&
                      (() => handleSaveValue("maxValue"))
                    }
                    className={`${styles.storyPoints} ${
                      userRole === "scrumMaster" && styles.storyPointsHovereable
                    }`}
                  >
                    <p>Maximum value</p>
                    <p>{room.maxValue}</p>
                  </div>
                ) : null}
              </div>
            </section>
            <section className={styles.buttons}>
              {userRole === "developer" &&
                sequence.map((v) => (
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
        </>
      )}
    </section>
  );
};

export default PokerPlanning;
