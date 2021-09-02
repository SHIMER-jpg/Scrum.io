import { React, useEffect, useState } from "react";
import {
  postTask,
  getProjectById,
  getTasksByProject,
  getAsignedUsers,
} from "../../redux/ManagerView/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import TaskHolder from "../../components/TaskHolder/TaskHolder";

import { useParams } from "react-router-dom";

import managerStyle from "./ManagerView.module.css";

export default function ManagerView(props) {
  const dispatch = useDispatch();
  // const { projectId } = props.match.params;
  const project = useSelector((state) => state.managerView.project);
  const asignedUsers = useSelector((state) => state.managerView.asignedUsers);
  const tasks = useSelector((state) => state.managerView.tasks);

  useEffect(() => {
    dispatch(getProjectById("6130d98660befaed28495ae9"));
    dispatch(getTasksByProject("6130d98660befaed28495ae9"));
    dispatch(getAsignedUsers("6130d98660befaed28495ae9"));
    // dispatch(getProjectById(projectId));
    // dispatch(getTasksByProject(projectId));
    // dispatch(getAsignedUsers(projectId));
  }, []);

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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postTask(createTask));
  }

  return (
    <>
      <Modal isOpen={modalOpen}>
        <div>
          <span>Entraste a MODALSXd</span>
          <button onClick={() => setModalOpen(false)}>X</button>
          <form onSubmit={(e) => handleSubmit(e)}>
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
        <header className={managerStyle.conteinerHeader}>
          <h1 className="main-heading">Project Name</h1>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            + Create Task
          </button>
        </header>
        <div className={managerStyle.conteinerBody}>
          {/* Pending Tasks */}
          <TaskHolder
            status={"Pending"}
            tasks={tasks.filter((task) => task.status === "Pending")}
          />
          {/* In progress Tasks */}
          <TaskHolder
            status={"In progress"}
            tasks={tasks.filter((task) => task.status === "In progress")}
          />
          {/* Testing Tasks */}
          <TaskHolder
            status={"Testing"}
            tasks={tasks.filter((task) => task.status === "Testing")}
          />
          {/* Completed Tasks */}
          <TaskHolder
            status={"Completed"}
            tasks={tasks.filter((task) => task.status === "Completed")}
          />
        </div>
      </div>
    </>
  );
}
