/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { BsUpload } from "react-icons/bs";
import taskTemplate from "../../static/TaskImportTemplate.csv";

import { bulkImport } from "../../redux/ManagerView/actions";

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
  setIsLoadingTasks,
}) => {
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleImport = ({ target }) => {
    if (file) {
      var formData = new FormData();

      formData.append("TASK_CSV", file);
      formData.append("projectId", projectId);

      setIsLoadingTasks(true);
      dispatch(bulkImport(formData, setIsLoadingTasks));

      setIsModalOpen(false);
    }
  };

  const handleAddFile = (e) => {
    e.preventDefault();

    // Comprobar que el archivo subido es un CSV
    if (e.target.files[0]["type"].split("/")[1] === "csv") {
      setFile(e.target.files[0]);
    } else {
      alert("Error:\nEl archivo subido no es de formato CSV");
      return null;
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
          <span>General considerations:</span>
          <ul>
            <li>Dates should be formatted as 'YYYY/MM/DD' (ex '1997/10/18')</li>
            <li>Every field should be wrapped around double quotes (")</li>
            <li>The separator between each field should be a semi-colon (;)</li>
          </ul>
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
              <li key={user._id}>
                {user.name + " "}
                <span>&#8594;</span>
                {" " + user._id}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.modalFormGroup}>
          <div className={styles.customInput}>
            <label htmlFor="upload-csv">
              <BsUpload strokeWidth={1} />{" "}
              {file
                ? file.name
                : "Select a file..."}
            </label>
            <input
              onChange={handleAddFile}
              id="upload-csv"
              type="file"
              ref={fileInput}
              accept=".csv"
            />
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
