import React from "react";
import styles from "./TaskHolder.module.css";

//components
import TaskCard from "../TaskCard/TaskCard.js";

// coso
import PROJECTS from "./../../hardcodingDataBD";

export default function TaskHolder({status, helpNeeded, taskList}) {

  // si se pasa un status, se filtran las tareas y se mapean solo las que tengan ese status
  if(status){
    taskList = PROJECTS[0].taskList.filter(task => task.status === status)
  }

  return (
    <div className={styles.tasks}>
      <div className={styles.tasks_Header}>
        <h2>{status ? status : helpNeeded ? "Help Needed" : "My Tasks"}</h2>
      </div>
      <div className={styles.taskList}>
        { taskList &&
          taskList.length > 0 ?
            taskList.map((pro) => (
              <TaskCard
                name={pro.title}
                description={pro.description}
                sp={pro.storypoint}
                complex={pro.complexitymatrix}
              />
            ))

          : <h3>No Tasks...</h3>
        }
      </div>
    </div>
  );
}
