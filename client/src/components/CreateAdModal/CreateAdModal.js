import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { createAdvertisement } from '../../redux/NoteDetail/actions'

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

export default function CreateAdModal(props){

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: ' ',
    description: ' ',
    projectId: props.projectId
  })
  console.log(input)

  function handleChange(e){
   setInput({
      ...input,
      [e.target.name] : e.target.value
   })
}

  function handleSubmit(e){
    e.preventDefault();
    dispatch(createAdvertisement(input))
    setInput({
      title: ' ',
      description: ' '
  })
}

  return (
    <Modal
      style={customStyles}
      isOpen={props.isModalOpen}
      onRequestClose={() => props.setIsModalOpen(false)}
    >

    <header className={styles.modalHeader}>
      <h2>Create Advertisement</h2>
      <button onClick={() => props.setIsModalOpen(false)}>
          <IoClose size={30} />
      </button>
    </header>

     <form className={styles.modalBody} onSubmit={(e)=>handleSubmit(e)}>
       <div className={styles.modalFormGroup}>
       <label>Title:</label>
          <input
          type= "text"
          name= "title"
          value={input.title}
          onChange={(e)=>handleChange(e)} 
          />
       </div>
       <div className={styles.modalFormGroup}>
        <label>Description:</label>
            <textarea
            type= "text"
            name= "description"
            value={input.description}
            onChange={(e)=>handleChange(e)} 
        />
       </div>
        <div className={styles.modalFormGroup}>
          <button type="submit">
            Create
          </button>
        </div>
     </form>
    </Modal>
  )
}
