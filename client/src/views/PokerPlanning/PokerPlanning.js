/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import TaskHolder from "../../components/TaskHolder/TaskHolder";
import { useEffect, useState } from "react";

import styles from "./PokerPlanning.module.css";

const VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 100, "?"];

const PokerPlanning = () => {
  const userRole = useSelector((state) => state.viewRouter.userRole);
  const { project, tasks } = useSelector(({ managerView }) => managerView);
  const socket = useSelector(({ app }) => app.socket);
  const [valueBackend, setValueBackend] = useState([]);

  useEffect(() => {
    socket.on("valueBackend", ({ value, projectId }) => {
      console.log("VALUE: ", value)
      console.log("project del socket: ", projectId)
      console.log("project local: ", project)
      projectId == project._id && setValueBackend([...valueBackend, value]);
    });
  }, []);

  const handleButtonClick = (value) => {
    console.log(value);

    socket.emit("value", { value, projectId: project._id });
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className="main-heading">{project.projectName}</h1>
      </header>
      {userRole === "scrumMaster" && (
        <TaskHolder status="Unrated stories" taskList={tasks} />
      )}
      <section className={styles.buttons}>
        {VALUES.map((v) => (
          <button onClick={() => handleButtonClick(v)}>{v}</button>
        ))}
        <div>
          VALUES DEL BACKEND HOLA:
          {valueBackend.map((i) => (
            <ul>
              <li>{i}</li>
            </ul>
          ))}
        </div>
      </section>
    </section>
  );
};

export default PokerPlanning;
