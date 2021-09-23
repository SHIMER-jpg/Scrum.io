/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Statistics.module.css";

// acciones
import {
  // getProjectById,
  // getAsignedUsers,
  getTasksByProject,
} from "../../redux/ManagerView/actions";

// components
import StatisticCard from "../../components/StatisticCard/StatisticCard";
import StatisticDeveloper from "../../components/StatisticDeveloper/StatisticDeveloper";
import { Redirect } from "react-router";

export default function Statistics(props) {
  const project = useSelector((state) => state.managerView.project);
  const tasks = useSelector((state) => state.managerView.tasks);
  const [mainIndicators, setMainIndicators] = useState({});
  const dispatch = useDispatch();

  // si no hay valores en los estados globales, ejecuta las acciones de ManagerView que los pedirian
  useEffect(() => {
    // dispatch(getProjectById(props.match.params.projectId));
    // dispatch(getAsignedUsers(props.match.params.projectId));
    if(project._id) {
      dispatch(getTasksByProject(props.match.params.projectId));
  
      const helpNeeded = tasks.filter((t) => t.helpNeeded).length;
      const totalTasks = tasks.length;
      const completedTasks = tasks.reduce((acc, val) => {
        if (val.status === "Completed") {
          return acc + 1;
        } else {
          return acc + 0;
        }
      }, 0);
      const totalStoryPoints = tasks.reduce((acc, val) => {
        return acc + val.storyPoints;
      }, 0);
      const completedStoryPoints = tasks.reduce((acc, val) => {
        if (val.status === "Completed") {
          return acc + val.storyPoints;
        } else {
          return acc + 0;
        }
      }, 0);
  
      setMainIndicators({
        ...mainIndicators,
        helpNeeded: helpNeeded,
        totalTasks: totalTasks,
        completedTasks: completedTasks,
        totalStoryPoints: totalStoryPoints,
        completedStoryPoints: completedStoryPoints,
      });
    }
  }, []);

  if(!project._id) {
    return <Redirect to={`/project/${props.match.params.projectId}`} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Statistics</h1>
        <div className={styles.helpNeeded}>
          <h4>Total Tasks</h4>
          <div></div>
          <h4>{mainIndicators.totalTasks}</h4>
        </div>
        <div className={styles.helpNeeded}>
          <h4>Completed Tasks</h4>
          <div></div>
          <h4>{mainIndicators.completedTasks}</h4>
        </div>
        <div className={styles.helpNeeded}>
          <h4>Total SP</h4>
          <div></div>
          <h4>{mainIndicators.totalStoryPoints}</h4>
        </div>
        <div className={styles.helpNeeded}>
          <h4>Completed SP</h4>
          <div></div>
          <h4>{mainIndicators.completedStoryPoints}</h4>
        </div>
        <div className={styles.helpNeeded}>
          <h4>Help needed</h4>
          <div></div>
          <h4>{mainIndicators.helpNeeded}</h4>
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
