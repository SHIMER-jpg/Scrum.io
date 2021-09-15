import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./CreateAdModal.module.css";

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

export default function CreateAdModal({isModalOpen, setIsModalOpen}) 
{
  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
     <form className={styles.formBody}>
     <label className={styles.modalFormGroup}>Title:</label>
        <input
        type= "text"
        name= "title"
    />
    <label className={styles.modalFormGroup}>Date:</label>
        <input
        type= "text"
        name= "date"
    />
    <label className={styles.modalFormGroup}>Description:</label>
        <input
        type= "text"
        name= "description"
    />
    <button className='btn-primary'>Create</button>
     </form>
    </Modal>
  )
}
