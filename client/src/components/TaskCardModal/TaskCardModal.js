//imports from react and hooks (even customs)
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTimeAgo from "../../hooks/useTimeAgo";

// redux actions
import { getNotesDetails, clearNotes } from "../../redux/NoteDetail/actions";
import { updateTask } from "../../redux/ManagerView/actions";
import { createNote } from "../../redux/NoteDetail/actions";

//components and utils
import { IoClose } from "react-icons/io5";
import NoteDetail from "../NoteDetail/NoteDetail";
import Dropdown from "../Dropdown/Dropdown";

import styles from "./TaskModal.module.css";

function TaskCardModal({ isOpen, setIsModalOpen, modalDetails }) {
  const { title, details, creationDate, _id, user, storyPoints } = modalDetails;
  const loggedId = useSelector((state) => state.app.loggedUser._id);
  const isManager = useSelector(
    (state) => state.viewRouter.userRole == "scrumMaster"
  );

  const [statusDropdownIsOpen, setStatusDropdownIsOpen] = useState(false);
  // const [colorMap, setColorMap] = useState("8eff7b");
  const [dynamicFields, setDynamicFields] = useState({
    status: modalDetails.status,
    helpNeeded: modalDetails.helpNeeded,
    priorization: modalDetails.priorization,
  });

  const [colorMap, setColorMap] = useState(
    dynamicFields.priorization == "Easy Win"
      ? "8eff7b"
      : dynamicFields.priorization == "Worth Pursuing"
      ? "ffa53c"
      : dynamicFields.priorization == "Strategic Initiative"
      ? "7befff"
      : dynamicFields.priorization == "Deprioritize"
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
    return function cleanUp() {
      dispatch(clearNotes());
    };
  }, []);

  /*
  * asignedTo: "613274bb1a9c7e2b10cfe1c1"
completedDate: "2021-07-08T06:04:10.000Z"
creationDate: "2021-05-10T06:53:16.000Z"
details: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."
helpNeeded: true
noteIds: ["61313b37fc13ae5ac3000cc7"]
priorization: "Deprioritize"
projectId: "61313b4dfc13ae1dd2000cf8"
status: "Testing"
storyPoints: 74
title: "Rank"
__v: 0
 */

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
      target.value == "Easy Win"
        ? "8eff7b"
        : target.value == "Worth Pursuing"
        ? "ffa53c"
        : target.value == "Strategic Initiative"
        ? "7befff"
        : target.value == "Deprioritize"
        ? "ff6868"
        : ""
    );
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
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Task Card"
      >
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <span className={styles.taskCard_StoryPoints}>{storyPoints} SP</span>
          <button onClick={() => setIsModalOpen(false)}>
            <IoClose size={30} />
          </button>
        </header>
        <div className={styles.modalBody}>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Assigned to</label>
            <div className={styles.userBox}>
              <img src={user.picture} alt={user.name} />
              <p>{user.name}</p>
            </div>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Created</label>
            <span>
              {new Date(creationDate).toLocaleDateString()} ({timeAgo})
            </span>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Priorization: </label>
            {isManager ? (
              <select onChange={(e) => handlePrioritizationChange(e)}>
                {[
                  "Easy Win",
                  "Deprioritize",
                  "Worth Pursuing",
                  "Strategic Initiative",
                ].map((value) =>
                  value == dynamicFields.priorization ? (
                    <option value={value} selected>
                      {value}
                    </option>
                  ) : (
                    <option value={value}>{value}</option>
                  )
                )}
              </select>
            ) : (
              <span>{dynamicFields.priorization}</span>
            )}
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Details: </label>
            <span>{details}</span>
          </div>

          <div className={styles.modalFormGroup}>
            <label>Notes: </label>
            <form onSubmit={(e) => handleNoteSubmit(e)}>
              <textarea
                className={styles.notes}
                name="content"
                value={newNote.content}
                // id=""
                // cols="30"
                // rows="10"
                onChange={(e) => handleArea(e)}
                placeholder="Write a new note..."
              ></textarea>
              <button type="submit">Add Note</button>
            </form>
          </div>
          <div className={styles.modalFormGroup}>
            {/* <div>{notes}</div> */}
            {notes.length > 0 &&
              notes.map((note) => {
                return (
                  <NoteDetail
                    key={note._id}
                    content={note.content}
                    userName={note.user.name}
                    userPicture={note.user.picture}
                  />
                );
              })}
          </div>
          <div className={styles.modalButtons}>
            <button
              className={`helpNeeded-${dynamicFields.helpNeeded}`}
              type="submit"
              onClick={(e) => handleOnClick(e)}
            >
              {dynamicFields.helpNeeded ? "Help Asked" : "Ask for help"}
            </button>
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
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TaskCardModal;
