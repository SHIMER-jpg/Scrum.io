/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Statistics.module.css";

// acciones
import {
  getProjectById,
  getTasksByProject,
  getAsignedUsers
} from "../../redux/ManagerView/actions";

// components
import StatisticCard from "../StatisticCard/StatisticCard";
import StatisticDeveloper from "../StatisticDeveloper/StatisticDeveloper";

export default function Statistics(props) {
  const project = useSelector((state) => state.managerView.project);
  const tasks = useSelector((state) => state.managerView.tasks);
  const users = useSelector((state) => state.managerView.asignedUsers);
  const dispatch = useDispatch();

  // si no hay valores en los estados globales, ejecuta las acciones de ManagerView que los pedirian
  useEffect(()=>{
    if(Object.keys(project).length === 0){
      dispatch(getProjectById(props.match.params.projectId));
    }
    if(tasks.length === 0){
      dispatch(getTasksByProject(props.match.params.projectId));
    }
    if(users.length === 0){
      dispatch(getAsignedUsers(props.match.params.projectId));
    }
  },[]);
  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <h1>Statistics</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.cardsList}>
          <StatisticCard tasks={tasks} project={project} graphType={"BurnDown Chart"}/>
          <StatisticCard tasks={tasks} project={project} graphType={"Tasks Priorization Chart"}/>
          <StatisticCard tasks={tasks} project={project} graphType={"Sprint Report"}/>
          <StatisticCard tasks={tasks} project={project} graphType={"Project Report"}/>
        </div>
        <div className={styles.specialCard}>
          <StatisticDeveloper />
        </div>
      </div>
    </div>
  );
}
