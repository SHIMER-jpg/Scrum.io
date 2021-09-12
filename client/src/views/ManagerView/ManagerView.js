/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState, useCallback } from "react";
import {
  getProjectById,
  getTasksByProject,
  getAsignedUsers,
  clearManagerView
} from "../../redux/ManagerView/actions";

import { fetchUsers } from "../../redux/Home/actions";
import { useDispatch, useSelector } from "react-redux";
import TaskHolder from "../../components/TaskHolder/TaskHolder";
import { FiUsers } from "react-icons/fi";

import managerStyle from "./ManagerView.module.css";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import { useParams } from "react-router-dom";
import { AddPartnerModal } from "../../components/CreateTaskModal/AddPartnerModal";

export default function ManagerView() {
  const tasks = useSelector((state) => state.managerView.tasks);

  const { projectId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAddPartner, setModalAddPartner] = useState(false);

  const dispatch = useDispatch();
  const project = useSelector((state) => state.managerView.project);
  const assignedUsers = useSelector((state) => state.managerView.asignedUsers);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const { socket, loggedUser } = useSelector((state) => state.app)
  const allUsers = useSelector((state) => state.home.users);

  const handleSocketUpdate = useCallback(({ projectId: projectFromSocket }) => {
    console.table({"Project ID": projectId, "Project ID from socket": projectFromSocket})

    if (projectFromSocket === projectId) {
      dispatch(getTasksByProject(projectId));
    }
  }, []);
  
  useEffect(() => {
    dispatch(fetchUsers(loggedUser));
    dispatch(getProjectById(projectId));
    dispatch(getTasksByProject(projectId, setIsLoadingTasks));
    dispatch(getAsignedUsers(projectId));

    // return () => dispatch(clearManagerView())
  }, []);

  useEffect(() => {
    socket.on("updateTask", handleSocketUpdate)

    return () => {
      socket.off("updateTask", handleSocketUpdate)
    }
  }, [loggedUser]);
  
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
              <FiUsers /> Manage users
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