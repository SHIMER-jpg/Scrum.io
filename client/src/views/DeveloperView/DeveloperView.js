import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasksByUser,
  getHelpTasks,
} from "../../redux/DeveloperView/DeveloperViewActions.js";
import styles from "./DeveloperView.module.css";

// components
import TaskHolder from "../../components/TaskHolder/TaskHolder";

export default function DeveloperView() {
  const dispatch = useDispatch();
  var userTaskList = useSelector((state) => state.developerView.userTasks);
  var helpTaskList = useSelector((state) => state.developerView.helpTasks);

  useEffect(() => {
    dispatch(getTasksByUser(2, 12)); //ids hardcodeados
    dispatch(getHelpTasks(2)); //id hardcodeada
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(helpTaskList);

  return (
    <div className={styles.DeveloperView}>
      <div className={styles.DeveloperView_Header}>
        <h1 className="main-heading">Project Name</h1>
      </div>
      <div className={styles.DeveloperView_Body}>
        {/* Componente de TODOS del usuario en este proyecto */}
        <TaskHolder taskList={userTaskList} />

        {/* Componente de TODOS que necesitan ayuda en este proyecto */}
        <TaskHolder helpNeeded={true} taskList={helpTaskList} />
      </div>
    </div>
  );
}
