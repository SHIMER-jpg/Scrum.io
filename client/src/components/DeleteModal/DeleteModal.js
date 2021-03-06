/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useState } from "react";

import { IoClose } from "react-icons/io5";

import styles from "./DeleteModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    padding: "40px",
    width: "50%",
    inset: "unset",
    maxHeight: "90vh",
    borderRadius: "8px",
    maxWidth: "650px",
    border: "3px solid red",
    backgroundColor: "var(--white)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "grid",
    placeItems: "center",
    zIndex: "100000",
  },
};

const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  deleteHandler,
  confirmationString,
  type,
}) => {
  const [inputString, setInputString] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = ({ target }) => {
    setInputString(target.value);
    if (target.value === confirmationString) setDisabled(false);
    else setDisabled(true);
  };
  const handleClick = (e) => {
    deleteHandler();
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <header className={styles.modalHeader}>
        <h2>Remove {type}?</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <div className={styles.modalFormGroup}>
        <p>
          Please type:
          <label> {confirmationString}</label>
        </p>
        <input value={inputString} onChange={handleChange} />
      </div>
      <div className={styles.modalButtons}>
        <button disabled={disabled} onClick={handleClick} type="submit">
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
