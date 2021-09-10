/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import {
  postTask,
  getProjectById,
  getTasksByProject,
  getAsignedUsers,
  updateTask,
} from "../../redux/ManagerView/actions";
import { fetchUsers } from "../../redux/Home/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import TaskHolder from "../../components/TaskHolder/TaskHolder";

import managerStyle from "./ManagerView.module.css";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../redux/ManagerView/actions";
import { AddPartnerModal } from "../../components/CreateTaskModal/AddPartnerModal";

export default function ManagerView() {
  const tasks = useSelector((state) => state.managerView.tasks);

  const { projectId } = useParams();

  // SOCKET EFFECT

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAddPartner, setModalAddPartner] = useState(false);

  const dispatch = useDispatch();
  // const route = useRouteMatch();
  const project = useSelector((state) => state.managerView.project);
  const assignedUsers = useSelector((state) => state.managerView.asignedUsers);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const allUsers = useSelector((state) => state.home.users);
  const loggedUser = useSelector((state) => state.app.loggedUser);

  console.log(allUsers);

  useEffect(() => {
    dispatch(fetchUsers(loggedUser));
    dispatch(getProjectById(projectId));
    dispatch(getTasksByProject(projectId, setIsLoadingTasks));
    dispatch(getAsignedUsers(projectId));
  }, []);

  function usersInProject() {
    var array = [];

    for (var i = 0; i < allUsers.length; i++) {
      for (var j in assignedUsers) {
        if (allUsers[i]._id === assignedUsers[j].userId) {
          array.push(allUsers[i]);
        }
      }
    }

    return array;
  }

  return (
    <>
      {isModalOpen && (
        <CreateTaskModal
          assignedUsers={assignedUsers}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          projectId={projectId}
        />
      )}
      <div className={managerStyle.conteiner}>
        <header className={managerStyle.conteinerHeader}>
          <h1 className="main-heading">
            {project.projectName || "Loading..."}
          </h1>
          <div style={{ display: "flex", gap: "30px" }}>
            {modalAddPartner && (
              <AddPartnerModal
                allUsers={allUsers}
                modalAddPartner={modalAddPartner}
                setModalAddPartner={setModalAddPartner}
                assignedUsers={usersInProject()}
                projectId={projectId}
              />
            )}

            <button
              className="btn-primary"
              onClick={() => setModalAddPartner(true)}
            >
              {" "}
              + Add Partners
            </button>

            <button
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              + Create Task
            </button>
          </div>
        </header>
        <div className={managerStyle.conteinerBody}>
          {/* Pending Tasks */}
          <TaskHolder
            isLoading={isLoadingTasks}
            status={"Pending"}
            taskList={tasks.filter((task) => task.status === "Pending")}
          />
          {/* In progress Tasks */}
          <TaskHolder
            isLoading={isLoadingTasks}
            status={"In progress"}
            taskList={tasks.filter((task) => task.status === "In progress")}
          />
          {/* Testing Tasks */}
          <TaskHolder
            isLoading={isLoadingTasks}
            status={"Testing"}
            taskList={tasks.filter((task) => task.status === "Testing")}
          />
          {/* Completed Tasks */}
          <TaskHolder
            isLoading={isLoadingTasks}
            status={"Completed"}
            taskList={tasks.filter((task) => task.status === "Completed")}
          />
        </div>
      </div>
    </>
  );
}

/* 

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
*/
