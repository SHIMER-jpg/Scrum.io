import React, { useState } from "react";
import styles from "./TaskHolder.module.css";

//components
import TaskCard from "../TaskCard/TaskCard.js";
import TaskCardModal from "../TaskCardModal/TaskCardModal";
// import { useState } from "react";

// coso

import Loading from "../Loading/Loading";

// coso

export default function TaskHolder({
  status,
  helpNeeded,
  taskList,
  isLoading,
  customHandleClick
}) {
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  // si se pasa un status, se filtran las tareas y se mapean solo las que tengan ese status
  // if (status) {
  //   taskList = taskList.filter((task) => task.status === status);
  // }
  // // si no se pasa status pero si helpNeeded, se mapean las tareas que necesiten ayuda
  // else if (helpNeeded) {
  //   taskList = taskList.filter((task) => task.helpNeeded === helpNeeded);
  // }
  // sino se pasa ninguno de los dos parametros, simplemente se mapean todas las que hayan en el proyecto

  return (
    <div className={styles.tasks}>
      <div className={styles.tasks_Header}>
        <h2>{status ? status : helpNeeded ? "Help Needed" : "My Tasks"}</h2>
      </div>
      <div className={styles.taskList}>
        {isLoading ? (
          <Loading isCentered={true} />
        ) : taskList && taskList.length > 0 ? (
          taskList.map((pro) => (
            <TaskCard
              onClick={() => {
                if(customHandleClick) customHandleClick(pro)
                else {
                  setModalDetails(pro);
                  setIsModalOpen(true);
                }
              }}
              key={pro._id}
              name={pro.title}
              description={pro.details}
              sp={pro.storyPoints}
              complex={pro.priorization?.replaceAll(" ", "_").toLowerCase()}
            />
          ))
        ) : (
          <h3 className={styles.noTasks}>No tasks yet.</h3>
        )}
        {modalIsOpen && (
          <TaskCardModal
            isOpen={modalIsOpen}
            setIsModalOpen={setIsModalOpen}
            modalDetails={modalDetails}
          />
        )}
      </div>
    </div>
  );
}

/**
 * 
 *   {taskList && taskList.length > 0 ? (
          <>
            {taskList.map((pro) => (
              <TaskCard
                onClick={() => {
                  setModalDetails(pro);
                  setIsModalOpen(true);
                }}
                key={pro._id}
                name={pro.title}
                description={pro.details}
                sp={pro.storyPoints}
                complex={pro.priorization?.replaceAll(" ", "_").toLowerCase()}
                // key={pro._id}
                // {...pro}
              />
            ))}
            {modalIsOpen && (
              <TaskCardModal
                isOpen={modalIsOpen}
                setIsModalOpen={setIsModalOpen}
                modalDetails={modalDetails}
              />
            )}
          </>
 */
