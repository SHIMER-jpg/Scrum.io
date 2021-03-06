/* eslint-disable react-hooks/exhaustive-deps */
//imports from react and hooks (even customs)
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../../hooks/useSearch";
import useTimeAgo from "../../hooks/useTimeAgo";
import Swal from "sweetalert2";

import { BsPencilSquare } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

// redux actions
import {
  getNotesDetails,
  clearNotes,
  removeNote,
} from "../../redux/NoteDetail/actions";
import { updateTask, deleteTask } from "../../redux/ManagerView/actions";
import { createNote } from "../../redux/NoteDetail/actions";

//components and utils
import { IoClose } from "react-icons/io5";
import NoteDetail from "../NoteDetail/NoteDetail";
import Dropdown from "../Dropdown/Dropdown";

import styles from "./TaskModal.module.css";

function TaskCardModal({ isOpen, setIsModalOpen, modalDetails }) {
  const { creationDate, _id, storyPoints, asignedTo } = modalDetails;
  const loggedId = useSelector((state) => state.app.loggedUser._id);
  const assignedUsers = useSelector((state) => state.managerView.asignedUsers);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [usersInProject, setUsersInProject] = useState([]);
  const [query, setQuery, filteredUsers] = useSearch(usersInProject);
  const maxSprint = useSelector(
    (state) => state.managerView.project.sprintCount
  );
  const isManager = useSelector(
    (state) => state.viewRouter.userRole === "scrumMaster"
  );
  const [statusDropdownIsOpen, setStatusDropdownIsOpen] = useState(false);

  const [dynamicFields, setDynamicFields] = useState({
    status: modalDetails.status,
    helpNeeded: modalDetails.helpNeeded,
    priorization: modalDetails.priorization,
    asignedTo: modalDetails.asignedTo,
    user: modalDetails.user,
    sprintId: modalDetails.sprintId,
    details: modalDetails.details,
    title: modalDetails.title,
  });

  const [isOpenSprint, setIsOpenSprintChange] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isTitleOpen, setIsTitleOpen] = useState(false);

  const [colorMap, setColorMap] = useState(
    dynamicFields.priorization === "Easy Win"
      ? "8eff7b"
      : dynamicFields.priorization === "Worth Pursuing"
      ? "ffa53c"
      : dynamicFields.priorization === "Strategic Initiative"
      ? "7befff"
      : dynamicFields.priorization === "Deprioritize"
      ? "ff6868"
      : ""
  );

  const customStyles = {
    content: {
      padding: "40px",
      inset: "unset",
      width: "100%",
      maxHeight: "88vh",
      borderRadius: "8px",
      maxWidth: "650px",
      borderTop: `8px solid #${colorMap}`,
      backgroundColor: "var(--white)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "grid",
      placeItems: "center",
      zIndex: "1000",
    },
  };
  const [newNote, setNewNote] = useState({
    content: "",
    taskId: _id,
    userId: loggedId,
  });

  const timeAgo = useTimeAgo(new Date(creationDate));
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.NotesReducer.notes);

  useEffect(() => {
    dispatch(getNotesDetails(_id));

    const filteredUsers = assignedUsers
      .filter(({ user }) => user._id !== loggedId)
      .map((u) => u.user);

    setUsersInProject(filteredUsers);

    return function cleanUp() {
      dispatch(clearNotes());
    };
  }, []);

  function handleStatusChange({ target }) {
    const change = {
      taskId: _id,
      field: "status",
      value: target.dataset.value,
    };

    setDynamicFields({
      ...dynamicFields,
      status: target.dataset.value,
    });

    dispatch(updateTask(change));
  }

  function handlePrioritizationChange({ target }) {
    const change = {
      taskId: _id,
      field: "priorization",
      value: target.value,
    };

    setDynamicFields({
      ...dynamicFields,
      priorization: target.value,
    });

    setColorMap(
      target.value === "Easy Win"
        ? "8eff7b"
        : target.value === "Worth Pursuing"
        ? "ffa53c"
        : target.value === "Strategic Initiative"
        ? "7befff"
        : target.value === "Deprioritize"
        ? "ff6868"
        : ""
    );

    dispatch(updateTask(change));
  }

  function handleFieldChange({ target }) {
    setDynamicFields({
      ...dynamicFields,
      [target.name]: target.value,
    });
  }

  function handleSprintChange({ target }) {
    const change = {
      taskId: _id,
      field: "sprintId",
      value: dynamicFields.sprintId,
    };
    setIsOpenSprintChange(false);
    dispatch(updateTask(change));
  }

  function handleDetailChange({ target }) {
    const change = {
      taskId: _id,
      field: "details",
      value: dynamicFields.details,
    };
    setIsDetailsOpen(false);
    dispatch(updateTask(change));
  }

  function handleTitleChange({ target }) {
    const change = { taskId: _id, field: "title", value: dynamicFields.title };
    setIsTitleOpen(false);
    dispatch(updateTask(change));
  }

  function handleArea(e) {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  }

  function handleNoteSubmit(e) {
    e.preventDefault();
    dispatch(createNote(newNote));
    setNewNote({ ...newNote, content: "" });
  }

  function handleOnClick() {
    const change = {
      taskId: _id,
      field: "helpNeeded",
      value: !dynamicFields.helpNeeded,
    };
    setDynamicFields({
      ...dynamicFields,
      helpNeeded: !dynamicFields.helpNeeded,
    });
    dispatch(updateTask(change));
  }

  const handleAddUser = (e, user) => {
    e.preventDefault();
    const change = {
      taskId: _id,
      field: "asignedTo",
      value: user._id,
    };
    setDynamicFields({
      ...dynamicFields,
      asignedTo: user._id,
      user: user,
    });
    setIsSelectUsersOpen(false);
    dispatch(updateTask(change));
    setQuery("");
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure you want to delete this task?",
      text: "This action is not reversible.",
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        // si apreto en "BORRAR"
        setIsModalOpen(false);
        dispatch(deleteTask(_id));
      }
    });
  };

  const handleRemoveNote = (noteId) => {
    dispatch(removeNote(noteId));
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Task Card"
      >
        <header className={styles.modalHeader}>
          {!isTitleOpen ? (
            <h2>{dynamicFields.title}</h2>
          ) : (
            <input
              name="title"
              value={dynamicFields.title}
              onChange={handleFieldChange}
            ></input>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--black)",
            }}
          >
            {isManager ? (
              !isTitleOpen ? (
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
                  onClick={handleTitleChange}
                  size={24}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              )
            ) : null}
            <span className={styles.taskCard_StoryPoints}>
              {storyPoints} SP
            </span>
          </div>
          <button onClick={() => setIsModalOpen(false)}>
            <IoClose size={30} />
          </button>
        </header>
        <div className={styles.modalBody}>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Assigned to</label>
            {!isSelectUsersOpen && (
              <div
                className={styles.userBox}
                onClick={() => {
                  isManager && setIsSelectUsersOpen(true);
                }}
              >
                <img
                  src={dynamicFields.user.picture}
                  alt={dynamicFields.user.name}
                />
                <p>{dynamicFields.user.name}</p>
              </div>
            )}
            {
              <div
                className={`${styles.modalSelectUser} ${
                  isSelectUsersOpen ? styles.visible : undefined
                }`}
              >
                <input
                  onBlur={() => setIsSelectUsersOpen(false)}
                  onFocus={() => setIsSelectUsersOpen(true)}
                  type="text"
                  id="assignedTo"
                  name="assignedTo"
                  value={query}
                  placeholder="Type a name..."
                  autoComplete="off"
                  onChange={(e) => setQuery(e.target.value)}
                />
                {filteredUsers.length ? (
                  filteredUsers.map((user) => (
                    <article
                      onClick={(e) => handleAddUser(e, user)}
                      key={user._id}
                      className={styles.modalUser}
                    >
                      <img src={user.picture} alt={user.name} />
                      <p>{user.name}</p>
                    </article>
                  ))
                ) : (
                  <p>There's no user with that name :(</p>
                )}
              </div>
            }
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Created</label>
            <span>
              {new Date(creationDate).toLocaleDateString()} ({timeAgo})
            </span>
          </div>
          <div className={styles.modalFormGroup}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <label>Sprint</label>
              {isManager ? (
                !isOpenSprint ? (
                  <BsPencilSquare
                    size={20}
                    onClick={() => setIsOpenSprintChange(true)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                ) : (
                  <TiTick
                    onClick={handleSprintChange}
                    size={24}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                )
              ) : null}
            </div>
            {!isOpenSprint ? (
              <span>{dynamicFields.sprintId || "Not assigned yet"}</span>
            ) : (
              <input
                onChange={handleFieldChange}
                onKeyDown={(e) => e.preventDefault()}
                type="number"
                name="sprintId"
                max={maxSprint}
                min={1}
                value={dynamicFields.sprintId}
              />
            )}
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Priorization: </label>
            {isManager ? (
              <select
                value={dynamicFields.priorization}
                onChange={(e) => handlePrioritizationChange(e)}
              >
                {[
                  "Easy Win",
                  "Deprioritize",
                  "Worth Pursuing",
                  "Strategic Initiative",
                ].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              <span>{dynamicFields.priorization}</span>
            )}
          </div>
          <div className={styles.modalFormGroup}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <label className={styles.titles}>Details: </label>
              {isManager ? (
                !isDetailsOpen ? (
                  <BsPencilSquare
                    size={20}
                    onClick={() => setIsDetailsOpen(true)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                ) : (
                  <TiTick
                    onClick={handleDetailChange}
                    size={24}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                )
              ) : null}
            </div>
            {!isDetailsOpen ? (
              <span>{dynamicFields.details}</span>
            ) : (
              <textarea
                name="details"
                value={dynamicFields.details}
                onChange={handleFieldChange}
              ></textarea>
            )}
          </div>

          <div className={styles.modalFormGroup}>
            <label>Notes: </label>
            <form onSubmit={(e) => handleNoteSubmit(e)}>
              <textarea
                className={styles.notes}
                name="content"
                value={newNote.content}
                onChange={(e) => handleArea(e)}
                placeholder="Write a new note..."
              ></textarea>
              <div className={styles.modalButtons}>
                <button type="submit">Add Note</button>
                <button
                  className={`${styles[dynamicFields.helpNeeded]}`}
                  type="submit"
                  onClick={(e) =>
                    loggedId === asignedTo || isManager
                      ? handleOnClick(e)
                      : () => {}
                  }
                >
                  {dynamicFields.helpNeeded ? "Help Asked" : "Ask for help"}
                </button>
              </div>
            </form>
          </div>
          <div className={styles.modalFormGroup}>
            {notes.length > 0 &&
              notes.map((note) => {
                return (
                  <NoteDetail
                    key={note._id}
                    id={note._id}
                    content={note.content}
                    userName={note.user.name}
                    userPicture={note.user.picture}
                    removeNote={handleRemoveNote}
                    render={isManager || loggedId === note.userId}
                  />
                );
              })}
          </div>
          <div className={styles.modalButtons}>
            {isManager && (
              <button
                className={styles.delete}
                type="submit"
                onClick={(e) => {
                  handleDelete(_id);
                }}
              >
                Delete Task
              </button>
            )}
            {(asignedTo === loggedId || isManager) && (
              <Dropdown
                isVisible={statusDropdownIsOpen}
                setIsVisible={setStatusDropdownIsOpen}
                name={dynamicFields.status}
                handler={handleStatusChange}
                values={
                  isManager
                    ? ["Pending", "In progress", "Testing", "Completed"]
                    : ["Testing", "Completed"]
                }
                theme="dark"
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TaskCardModal;
