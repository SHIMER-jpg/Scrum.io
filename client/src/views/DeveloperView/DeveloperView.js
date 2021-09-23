/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasksByUser,
  getHelpTasks,
  clearDevView,
} from "../../redux/DeveloperView/actions.js";
import { getProjectById } from "../../redux/ManagerView/actions";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet"

import styles from "./DeveloperView.module.css";

// components
import TaskHolder from "../../components/TaskHolder/TaskHolder";

export default function DeveloperView() {
  const dispatch = useDispatch();
  const userTaskList = useSelector((state) => state.developerView.userTasks);
  const helpTaskList = useSelector((state) => state.developerView.helpTasks);
  const userLogged = useSelector((state) => state.app.loggedUser);
  const project = useSelector((state) => state.managerView.project);
  const socket = useSelector((state) => state.app.socket);
  const { projectId } = useParams();

  const handleSocketUpdate = useCallback(({ projectId: projectFromSocket }) => {
    console.table({"Project ID": projectId, "Project ID from socket": projectFromSocket})

    if (projectFromSocket === projectId) {
      dispatch(getTasksByUser(projectId, userLogged._id)); 
      dispatch(getHelpTasks(projectId)); 
    }
  }, []);

  useEffect(() => {
    dispatch(getTasksByUser(projectId, userLogged._id)); //aca iria la id del proyecto al que se ingreso por home
    dispatch(getHelpTasks(projectId)); //aca iria la id del proyecto al que se ingreso por home
    dispatch(getProjectById(projectId));

    socket.on("updateTask", handleSocketUpdate);

    return () => {
      socket.off("updateTask", handleSocketUpdate)
      dispatch(clearDevView())
    };
  }, [userLogged]);

  return (
    <div className={styles.DeveloperView}>
      <Helmet>
        <title>{project?.projectName || "Loading"} | Scrum.io</title>
      </Helmet>
      <div className={styles.DeveloperView_Header}>
        <h1 className="main-heading">{project.projectName || "Loading..."}</h1>
      </div>
      <div className={styles.DeveloperView_Body}>
        {/* Componente de TODOS del usuario en este proyecto */}
        <TaskHolder taskList={userTaskList} />

        {/* Componente de TODOS que necesitan ayuda en este proyecto */}
        <TaskHolder helpNeeded={true} taskList={helpTaskList.filter(task => task.asignedTo !== userLogged._id)} />
      </div>
    </div>
  );
}
