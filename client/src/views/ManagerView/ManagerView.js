import { React, useEffect, useState } from "react";
import { postTask } from "../../redux/ManagerView/actions";
import { useDispatch } from "react-redux"
import Modal from "react-modal";
import TaskHolder from "../../components/TaskHolder/TaskHolder";

import managerStyle from "./ManagerView.module.css";



export default function ManagerView() {

  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false);

  const [createTask, setCreateTask] = useState({
    title: "",
    asignedTo: "",
    storyPoints: "",
    priorization: "to do",
    details: "",
  });

  function handleInput(event) {
    setCreateTask({
      ...createTask,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log("entro al handle", postTask())
    dispatch(postTask(createTask))
  }


  return (
    <>
      <div>
        <Modal isOpen={modalOpen}>
          <div>
            <span>Entraste a MODALSXd</span>
            <button onClick={() => setModalOpen(false)}>X</button>
            <form onSubmit = {(e) => handleSubmit(e)}>
              <div>
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  value={createTask.test}
                  onChange={(e) => handleInput(e)}
                ></input>
              </div>
              <div>
                <label>Asigned Dev</label>
                <input
                  name="asignedTo"
                  type="text"
                  value={createTask.asignedTo}
                  onChange={(e) => handleInput(e)}
                ></input>
              </div>
              <div>
                <label>Story Points</label>
                <input
                  name="storyPoints"
                  type="text"
                  value={createTask.storyPoints}
                  onChange={(e) => handleInput(e)}
                ></input>
              </div>
              <div>
                <label>Priorization</label>
                <select
                  value={createTask.priorization}
                  name="priorization"
                  onChange={(e) => handleInput(e)}
                >
                  <option value="none">None</option>
                  <option value="Easy Win">Easy Win</option>
                  <option value="Depriorize">Depriorize</option>
                  <option value="Worth Pursuing">Worth Pursuing</option>
                  <option value="Strategic Initiative">
                    Strategic Initiative
                  </option>
                </select>
              </div>
              <div>
                <label>Detail</label>
                <textarea
                  style={{ resize: "none" }}
                  value={createTask.details}
                  name="details"
                  onChange={(e) => handleInput(e)}
                ></textarea>
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </Modal>
        <div className={managerStyle.conteiner}>
          <div className={managerStyle.conteinerHeader}>
            <h1>Project Name</h1>
            <button onClick={() => setModalOpen(true)}>Create Task +</button>
          </div>
          <div className={managerStyle.conteinerBody}>
            {/* Pending Tasks */}
            <TaskHolder status={"Pending"} />
            {/* In progress Tasks */}
            <TaskHolder status={"In progress"} />
            {/* Completed Tasks */}
            <TaskHolder status={"Completed"}/>
            {/* Testing Tasks */}
            <TaskHolder status={"Testing"} />
          </div>
        </div>
      </div>
    </>
  );
}
