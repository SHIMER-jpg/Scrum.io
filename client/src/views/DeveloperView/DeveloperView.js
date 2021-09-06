/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasksByUser,
  getHelpTasks,
} from "../../redux/DeveloperView/actions.js";
import { getProjectById } from "../../redux/ManagerView/actions";

import styles from "./DeveloperView.module.css";

// components
import TaskHolder from "../../components/TaskHolder/TaskHolder";

export default function DeveloperView({ projectId }) {
  const dispatch = useDispatch();
  const userTaskList = useSelector((state) => state.developerView.userTasks);
  const helpTaskList = useSelector((state) => state.developerView.helpTasks);
  const userLogged = useSelector((state) => state.app.loggedUser);
  const project = useSelector((state) => state.managerView.project);

  useEffect(() => {
    dispatch(getTasksByUser(projectId, userLogged._id)); //aca iria la id del proyecto al que se ingreso por home
    dispatch(getHelpTasks(projectId)); //aca iria la id del proyecto al que se ingreso por home
    dispatch(getProjectById(projectId));
  }, [userLogged]);

  return (
    <div className={styles.DeveloperView}>
      <div className={styles.DeveloperView_Header}>
        <h1 className="main-heading">{project.projectName || "Loading..."}</h1>
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
