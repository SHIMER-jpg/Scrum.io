/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import taskTemplate from "../../static/TaskImportTemplate.csv";

import { useSearch } from "../../hooks/useSearch";
import { createTask, bulkImport } from "../../redux/ManagerView/actions";

import styles from "./ImportCsvModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    padding: "40px",
    inset: "unset",
    width: "100%",
    maxHeight: "90vh",
    borderRadius: "8px",
    maxWidth: "650px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "grid",
    placeItems: "center",
    zIndex: "100000",
  },
};

const ImportCsvModal = ({
  isModalOpen,
  setIsModalOpen,
  assignedUsers,
  projectId,
  onClose,
}) => {
  const fileInput = useRef();
  const dispatch = useDispatch();

  const handleImport = ({ target }) => {
    if (fileInput.current.files[0]) {
      var formData = new FormData();
      formData.append("TASK_CSV", fileInput.current.files[0]);
      formData.append("projectId", projectId);
      dispatch(bulkImport(formData));
      onClose();
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <header className={styles.modalHeader}>
        <h2>Import from CSV</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <div className={styles.modalBody}>
        <div className={styles.modalFormGroup}>
          <label>
            In order to import a CSV file successfully have the following
            considerations in mind.
          </label>
          <span>The "STATUS" field only takes this exact values:</span>
          <ul>
            <li>Pending</li>
            <li>In progress</li>
            <li>Testing</li>
            <li>Completed</li>
          </ul>
          <span>The "PRIORIZATION" field only takes this exact values:</span>
          <ul>
            <li>Easy Win</li>
            <li>Deprioritize</li>
            <li>Worth Pursuing</li>
            <li>Strategic Initiative</li>
          </ul>
          <span>
            The available developers (to whose id the task should be assigned)
            for this project are:
          </span>
          <ul>
            {assignedUsers.map((user) => (
              <li>
                {user.name + " "}
                <span>&#8594;</span>
                {" " + user._id}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.modalFormGroup}>
          <div className={styles.customInput}>
            <input type="file" ref={fileInput} accept=".csv" />
          </div>
        </div>
        <div className={styles.modalButtons}>
          <a href={taskTemplate}>
            <button>Download Template</button>
          </a>
          <button onClick={handleImport}>Import</button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportCsvModal;
