import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksByUser, getHelpTasks } from "../../redux/DeveloperView/DeveloperViewActions.js";
import styles from "./TaskHolder.module.css";

//components
import TaskCard from "../TaskCard/TaskCard.js";

// coso
import PROJECTS from "./../../hardcodingDataBD";

<<<<<<< HEAD
export default function TaskHolder({tasks, status, helpNeeded}) {
  var taskList = []; // lista de tareas a mapear con TaskCard
  
=======
export default function TaskHolder({status, helpNeeded}) {
  const dispatch = useDispatch();
  var taskList = useSelector((state) => state.tasks);
  var helpTaskList = useSelector((state) => state.helpTasks);

  useEffect(() => {
    dispatch(getTasksByUser(2, 12));  //ids hardcodeados
    dispatch(getHelpTasks(2));  //id hardcodeada
  }, [])

  // var taskList = []; // lista de tareas a mapear con TaskCard

>>>>>>> 7e1ec297a686b236a62a7082791eacca31036907
  // si se pasa un status, se filtran las tareas y se mapean solo las que tengan ese status
  if(status){
    taskList = PROJECTS[0].taskList.filter(task => task.status === status)
  }
  // si no se pasa status pero si helpNeeded, se mapean las tareas que necesiten ayuda
  else if(helpNeeded){
    taskList = PROJECTS[0].taskList.filter(task => task.helpNeeded)
  }
  // sino se pasa ninguno de los dos parametros, simplemente se mapean todas las que hayan en el proyecto
  else{
    taskList = PROJECTS[0].taskList
  }

  return (
    <div className={styles.tasks}>
      <div className={styles.tasks_Header}>
        <h2>{status ? status : helpNeeded ? "Tasks need help" : "My Tasks"}</h2>
      </div>
      <div className={styles.taskList}>
        {
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
