import Modal from "react-modal";
import { useState, useEffect } from "react";
import styles from "./TaskModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getNotesDetails, clearNotes } from "../../redux/NoteDetail/actions";
import { createNote } from "../../redux/DeveloperView/DeveloperViewActions";
import yo from "./mockupDataDetail";
import { IoClose } from "react-icons/io5";
import NoteDetail from "../NoteDetail/NoteDetail";

const customStyles = {
  content: {
    padding: "40px",
    inset: "unset",
    width: "100%",
    maxHeight: "88vh",
    borderRadius: "8px",
    maxWidth: "650px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "grid",
    placeItems: "center",
  },
};

function TaskCardModal({ isOpen, setIsModalOpen, modalDetails }) {
  const { scenario, assignedTo, completedDate, taskBreakout } = yo;

  const { title, details, creationDate, _id, user } = modalDetails;

  const [status, setStatus] = useState({});

  const dispatch = useDispatch();

  const notes = useSelector((state) => state.NotesReducer.notes);

  useEffect(() => {
    dispatch(getNotesDetails(_id));
    return function cleanUp() {
      dispatch(clearNotes());
    };
  }, []);
  /*
  asignedTo: "613274bb1a9c7e2b10cfe1c1"
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

  function handleStatusSelect(e) {
    // setStatus({
    //   ...status,
    //   [e.target.name]: e.target.value,
    // });
  }

  function handlePriorizationSelect(e) {
    // setPriorization({
    //   ...priorization,
    //   [e.target.name]: e.target.value,
    // });
  }

  function handleArea(e) {
    setStatus({
      ...status,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(createNote(e));
  }

  function handleOnClick({ target }) {
    console.log(target);
    console.log(modalDetails);

    // dispatch(modifyingTaskById(taskId));
  }
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Task Card">
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <IoClose size={30} />
          </button>
        </header>
        <div className={styles.modalBody}>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Assigned to</label>
            <div className={styles.userBox}>
              <img src={user.picture} />
              <p>{user.name}</p>
            </div>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Created</label>
            <span>{creationDate}</span>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Priorization: </label>
            <select
              onChange={(e) => handleStatusSelect(e)}
              onClick={(e) => handleOnClick(e)}
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In progress</option>
              <option value="testing">Testing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.titles}>Details: </label>
            <span>{details}</span>
          </div>

          <div className={styles.modalFormGroup}>
            <label>Notes: </label>
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea
                className={styles.notes}
                // name="notes"
                // id=""
                // cols="30"
                // rows="10"
                onChange={(e) => handleArea(e)}
              ></textarea>
              <button type="submit">Add Note</button>
            </form>
          </div>
          <div className={styles.modalFormGroup}>
            {/* <div>{notes}</div> */}
            {notes.map((note) => {
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
            <button type="submit" onClick={(e) => handleOnClick(e)}>
              🤔 Ask for help
            </button>

            <select
              onChange={(e) => handlePriorizationSelect(e)}
              onClick={(e) => handleOnClick(e)}
            >
              <option value="">Priorization</option>
              <option value="easyWin">Easy Win</option>
              <option value="depriorize">Depriorize</option>
              <option value="worthPursuing">Worth Pursuing</option>
              <option value="strategicInitiative">Strategic Initiative</option>
            </select>
            <select
              onChange={(e) => handleStatusSelect(e)}
              onClick={(e) => handleOnClick(e)}
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In progress</option>
              <option value="testing">Testing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TaskCardModal;
