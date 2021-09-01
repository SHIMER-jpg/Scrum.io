import React from "react";
import styles from "./../Tasks/TaskCard.module.css";

//components
import TaskCard from "../Tasks/TaskCard.js";

// coso

import PROJECTS from "./../../hardcodingDataBD";

export default function TaskHolder() {
  console.log(PROJECTS);
  return (
    <div className={styles.tasks}>
      <div className={styles.tasks_Header}>
        <h2>To Do</h2>
      </div>
      <div className={styles.taskList}>
        {PROJECTS !== undefined &&
          PROJECTS.length > 0 &&
          PROJECTS[0].taskList.map((pro) => (
            <TaskCard
              name={pro.title}
              description={pro.description}
              sp={pro.storypoint}
              complex={pro.complexitymatrix}
            />
          ))}
      </div>
    </div>
  );
}
