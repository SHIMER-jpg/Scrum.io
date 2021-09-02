import { React, useEffect } from "react";
import styles from "./../TaskCard/TaskCard.module.css";

//components
import TaskCard from "../TaskCard/TaskCard.js";

// coso
import PROJECTS from "./../../hardcodingDataBD";

export default function TaskHolder({ status, helpNeeded, tasks }) {
  var taskList = []; // lista de tareas a mapear con TaskCard

  // si se pasa un status, se filtran las tareas y se mapean solo las que tengan ese status
  if (status) {
    taskList = PROJECTS[0].taskList.filter((task) => task.status === status);
  }
  // si no se pasa status pero si helpNeeded, se mapean las tareas que necesiten ayuda
  else if (helpNeeded) {
    taskList = PROJECTS[0].taskList.filter(
      (task) => task.helpNeeded === helpNeeded
    );
  }
  // sino se pasa ninguno de los dos parametros, simplemente se mapean todas las que hayan en el proyecto
  else {
    taskList = PROJECTS[0].taskList;
  }

  return (
    <div className={styles.tasks}>
      <div className={styles.tasks_Header}>
        <h2>{status ? status : "My Tasks"}</h2>
      </div>
      <div className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks
            .concat(taskList) //PARA RENDERIZAR CON LO QUE HARDCODEADO
            .map((pro) => (
              <TaskCard
                name={pro.title}
                description={pro.details}
                sp={pro.storyPoints}
                complex={pro.priorization?.replaceAll(" ", "_").toLowerCase()}
              />
            ))
        ) : (
          <h3>No Tasks...</h3>
        )}
      </div>
    </div>
  );
}
