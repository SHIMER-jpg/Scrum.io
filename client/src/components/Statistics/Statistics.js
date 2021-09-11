/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Statistics.module.css";

// acciones
import {
  getProjectById,
  getTasksByProject,
  getAsignedUsers,
} from "../../redux/ManagerView/actions";

// components
import StatisticCard from "../StatisticCard/StatisticCard";
import StatisticDeveloper from "../StatisticDeveloper/StatisticDeveloper";

export default function Statistics(props) {
  const project = useSelector((state) => state.managerView.project);
  const tasks = useSelector((state) => state.managerView.tasks);
  const dispatch = useDispatch();

  // si no hay valores en los estados globales, ejecuta las acciones de ManagerView que los pedirian
  useEffect(() => {
    dispatch(getProjectById(props.match.params.projectId));

    dispatch(getAsignedUsers(props.match.params.projectId));

    dispatch(getTasksByProject(props.match.params.projectId));
  }, []);

  var helpNeeded = tasks.filter((t) => t.helpNeeded).length;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Statistics</h1>
        <div className={styles.helpNeeded}>
          <h4>Help needed</h4>
          <div></div>
          <h4>{helpNeeded}</h4>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.specialCard}>
          <StatisticCard
            tasks={tasks}
            project={project}
            graphType={"BurnDown Chart"}
          />
        </div>
        <div className={styles.cardsList}>
          <StatisticCard
            tasks={tasks}
            project={project}
            graphType={"Tasks Priorization Chart"}
          />
          <StatisticCard
            tasks={tasks}
            project={project}
            graphType={"Project Report"}
          />
        </div>
        <div className={styles.specialCard}>
          <StatisticDeveloper />
        </div>
      </div>
    </div>
  );
}
