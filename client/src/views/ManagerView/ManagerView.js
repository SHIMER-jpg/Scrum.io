/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState, useCallback } from "react";
import {
  getProjectById,
  getTasksByProject,
  getAsignedUsers,
  clearManagerView,
  editProject,
} from "../../redux/ManagerView/actions";

import { fetchUsers } from "../../redux/Home/actions";
import { useDispatch, useSelector } from "react-redux";
import TaskHolder from "../../components/TaskHolder/TaskHolder";
import { FaFileCsv } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { CSVLink } from "react-csv";

import TasksCrud from "../../components/TasksCrud/TasksCrud";
import { BsTable } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { HiViewBoards } from "react-icons/hi";

import managerStyle from "./ManagerView.module.css";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import { useParams } from "react-router-dom";
import { AddPartnerModal } from "../../components/AddPartnerModal/AddPartnerModal";
import ImportCsvModal from "../../components/ImportCsvModal/ImportCsvModal";
import { StylesContext } from "@material-ui/styles";
import { Configuration } from "../Configuration/Configuration";
import { Helmet } from "react-helmet";
import moment from "moment";
moment().format();

export default function ManagerView() {
  const tasks = useSelector((state) => state.managerView.tasks);

  const { projectId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAddPartner, setModalAddPartner] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [tasksView, setTasksView] = useState("boardsView");

  const dispatch = useDispatch();
  const project = useSelector((state) => state.managerView.project);
  const assignedUsers = useSelector((state) => state.managerView.asignedUsers);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const { socket, loggedUser } = useSelector((state) => state.app);
  const allUsers = useSelector((state) => state.home.users);

  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [title, setTitle] = useState(project.projectName);
  const [filterSprint, setFilterSprint] = useState(null);
  const [openDelete, setOpenDelete] = useState(false); //deberia ser false

  const makeCsvReport = () => {
    const header = [
      { label: "Title", key: "title" },
      { label: "Creation Date", key: "creationDate" },
      { label: "Assigned To", key: "asignedTo" },
      { label: "Completed Date", key: "completedDate" },
      { label: "Status", key: "status" },
      { label: "Story Points", key: "storyPoints" },
      { label: "Prioritization", key: "priorization" },
      { label: "Sprint Number", key: "sprintId" },
      { label: "Details", key: "details" },
    ];

    return {
      data: tasks.map((task) => {
        return {
          title: task.title,
          creationDate: task.creationDate,
          asignedTo: task.asignedTo,
          completedDate: task.completedDate,
          status: task.status,
          storyPoints: task.storyPoints,
          priorization: task.priorization,
          sprintId: task.sprintId,
          details: task.details,
        };
      }),
      header: header,
      filename: `Scrum.io-project-${project.projectName}-${moment().format(
        "DD-MM-YYYY"
      )}.csv`,
      separator: ";",
    };
  };

  const switchTasksView = () => {
    if (tasksView === "boardsView") {
      setTasksView("crudView");
    } else {
      setTasksView("boardsView");
    }
  };
  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleTitleSubmit = () => {
    setIsTitleOpen(false);
    dispatch(
      editProject({ id: projectId, field: "projectName", value: title })
    );
  };

  const handleSocketUpdate = useCallback(({ projectId: projectFromSocket }) => {
    console.table({
      "Project ID": projectId,
      "Project ID from socket": projectFromSocket,
    });

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
    socket.on("updateTask", handleSocketUpdate);

    return () => {
      socket.off("updateTask", handleSocketUpdate);
    };
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

  const handleSetSprint = (value) => {
    if (value === "increment") {
      setFilterSprint((prevVal) =>
        !prevVal ? 1 : prevVal + 1 > project.sprintCount ? prevVal : prevVal + 1
      );
    } else {
      setFilterSprint((prevVal) =>
        !prevVal ? null : prevVal - 1 === 0 ? null : prevVal - 1
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{project?.projectName || "Loading..."} | Scrum.io</title>
      </Helmet>
      {isModalOpen && (
        <CreateTaskModal
          assignedUsers={assignedUsers}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          projectId={projectId}
          sprintCount={project.sprintCount}
          tasks={tasks}
        />
      )}
      {importModal && (
        <ImportCsvModal
          assignedUsers={usersInProject()}
          isModalOpen={importModal}
          setIsModalOpen={setImportModal}
          projectId={projectId}
          setIsLoadingTasks={setIsLoadingTasks}
        />
      )}
      <div className={managerStyle.conteiner}>
        <header className={managerStyle.conteinerHeader}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "auto",
              color: "var(--black)",
            }}
          >
            {!isTitleOpen ? (
              <h1 className="main-heading">
                {project?.projectName || "Loading..."}
              </h1>
            ) : (
              <input
                name="title"
                value={title}
                onChange={handleTitleChange}
              ></input>
            )}
            {!isTitleOpen ? (
              <BsPencilSquare
                size={20}
                onClick={() => setIsTitleOpen(true)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <TiTick
                onClick={handleTitleSubmit}
                size={24}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              />
            )}
          </div>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            {modalAddPartner && (
              <AddPartnerModal
                allUsers={allUsers}
                modalAddPartner={modalAddPartner}
                setModalAddPartner={setModalAddPartner}
                assignedUsers={usersInProject()}
                projectId={projectId}
              />
            )}
            <div
              onClick={() => setModalAddPartner(true)}
              className={managerStyle.userBlobs}
            >
              {assignedUsers.map((user, index) => {
                return index < 3 ? (
                  <img
                    key={user._id}
                    src={user.user.picture}
                    alt={user.user.name}
                    title={user.user.name}
                  />
                ) : (
                  null
                );
              })}
              {assignedUsers.length > 3 ? (
                <div className={managerStyle.more}>
                  +{assignedUsers.length - 3}
                </div>
              ) : (
                ""
              )}
            </div>

            <button className="btn-primary" onClick={() => switchTasksView()}>
              {tasksView === "boardsView" ? <BsTable /> : <HiViewBoards />}
            </button>

            <button
              className="btn-primary"
              onClick={() => setImportModal(true)}
            >
              <FaFileCsv size={18} />
              Import CSV
            </button>
            <button className="btn-primary" onClick={null}>
              <CSVLink style={{ all: "unset" }} {...makeCsvReport()}>
                <FaFileCsv size={18} />
                Export CSV
              </CSVLink>
            </button>

            <button
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <GoPlus /> Create Task
            </button>

            <button
              onClick={() => setOpenDelete(!openDelete)}
              className={`${managerStyle.configButton} ${
                openDelete && managerStyle.configButtonOpen
              }`}
            >
              <BiCog
                style={{ color: "var(--violet)", cursor: "pointer" }}
                size={30}
              />
            </button>
            {openDelete && <Configuration setOpenDelete={setOpenDelete} />}
          </div>
        </header>
        <section className={managerStyle.projectDetails}>
          <div className={managerStyle.dateDetails}>
            <div className={managerStyle.projectDetailsItem}>
              <p>Start date</p>
              <div>
                <AiOutlineCalendar />
                <p>
                  {new Date(project.startDate).toLocaleDateString("es-ES", {
                    timeZone: "UTC",
                  })}
                </p>
              </div>
            </div>
            <div className={managerStyle.projectDetailsItem}>
              <p>Required date</p>
              <div>
                <AiOutlineCalendar />
                <p>
                  {new Date(project.requiredDate).toLocaleDateString("es-ES", {
                    timeZone: "UTC",
                  })}
                </p>
              </div>
            </div>
            <div
              className={managerStyle.projectDetailsItem}
              style={{ alignItems: "center" }}
            >
              <p>Sprint qty.</p>
              <div>
                <p>{project.sprintCount}</p>
              </div>
            </div>
            <div
              className={managerStyle.projectDetailsItem}
              style={{ alignItems: "center" }}
            >
              <p>Sprint duration</p>
              <div>
                <p>
                  {project.sprintDuration}
                  {project.sprintDuration > 1 ? " weeks" : " week"}
                </p>
              </div>
            </div>
            <div
              className={managerStyle.projectDetailsItem}
              style={{ alignItems: "center" }}
            >
              <p>Current sprint</p>
              <div>
                <p>
                  {project.currentSprint > 0 ? project.currentSprint : "Done"}
                </p>
              </div>
            </div>
          </div>
          {tasksView === "boardsView" ? (
            <div className={managerStyle.sprintDetails}>
              <p>Sprint</p>
              <div>
                <button onClick={() => handleSetSprint("decrement")}>
                  <FiChevronLeft size={22} />
                </button>
                <p>{filterSprint ? filterSprint : "All sprints"}</p>
                <button onClick={() => handleSetSprint("increment")}>
                  <FiChevronRight size={22} />
                </button>
              </div>
            </div>
          ) : null}
        </section>

        {tasksView === "boardsView" ? (
          <div className={managerStyle.conteinerBody}>
            {/* Pending Tasks */}
            <TaskHolder
              isLoading={isLoadingTasks}
              status={"Pending"}
              taskList={tasks
                .filter((t) => (filterSprint ? t.sprintId === filterSprint : t))
                .filter((task) => task.status === "Pending")}
            />
            {/* In progress Tasks */}
            <TaskHolder
              isLoading={isLoadingTasks}
              status={"In progress"}
              taskList={tasks
                .filter((t) => (filterSprint ? t.sprintId === filterSprint : t))
                .filter((task) => task.status === "In progress")}
            />
            {/* Testing Tasks */}
            <TaskHolder
              isLoading={isLoadingTasks}
              status={"Testing"}
              taskList={tasks
                .filter((t) => (filterSprint ? t.sprintId === filterSprint : t))
                .filter((task) => task.status === "Testing")}
            />
            {/* Completed Tasks */}
            <TaskHolder
              isLoading={isLoadingTasks}
              status={"Completed"}
              taskList={tasks
                .filter((t) => (filterSprint ? t.sprintId === filterSprint : t))
                .filter((task) => task.status === "Completed")}
            />
          </div>
        ) : (
          <div className={managerStyle.conteinerBody}>
            <TasksCrud tasks={tasks} />
          </div>
        )}
      </div>
    </>
  );
}
