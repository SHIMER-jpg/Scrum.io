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
import { CgGoogleTasks } from "react-icons/cg";

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
  const [saveTask, setSaveTask] = useState(tasks);

  // 1. El input tiene que ser igual al string que se inserta en el input box
  // el select, tiene que ser igual a un CALLBACK, ya que .sort funcionna
  // a travez de una cb function
  var [taskFilter, setTaskFilter] = useState({
    input: "",
    select: undefined,
    showNoValueTask: undefined,
    selectComplex: undefined,
  });

  const dispatch = useDispatch();
  // actualizar tareas cada vez q elegis un filtro ( se acumulan xD)
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

  // 2. Aca, vamos a guardar dentro del taskFilter.select una funcion de callback
  // tendria que venir los IFS que estan en el use effect y la funcion de CB en vez de
  // otro valor
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

  const handleSaveValue = () => {
    // este callback se va a ejecutar cuando se termine de actualizar la task
    function cb() {
      console.log("SE EJECUTO EL CALLBACK")
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

  //3. Aca vamos a guardar el string nuevo, cada vez que se toque una tecla
  //dentro del state taskFilter.input
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
            style={{ width: "420px", maxHeight: "600px", overflowY: "auto" }}
          >
            <input
              type="text"
              name="input"
              onChange={(e) => filterTaskList(e)}
            />
            {/* 
            4. como el componente hijo, se renderiza segun la informacion que le pasamos aca abajo,
            lo que vamos a hacer es volver dinamica la infromacion que le pasamos.
            
            taskList = tasks.filter(task=>task.title.toLowerCase().includes(taskFilter.input.toLowerCase())).sort(taskFilter.select)
            */}
            <TaskHolder
              taskList={saveTask}
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
              <select id="fede" name="select" onChange={(e) => handleSelect(e)}>
                <option value="less">Less Points</option>
                <option value="more">More Points</option>
                <option value="none">None Points</option>
              </select>
            </div>
          ) : null}
        </div>
        <div>
          {userRole === "scrumMaster" ? (
            <div>
              <div>
                <label>Complexity</label>
              </div>
              <select
                id="fede"
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
