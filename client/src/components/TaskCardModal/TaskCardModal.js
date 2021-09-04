import Modal from "react-modal";
import { useState, useEffect } from "react";
import TaskDetail from "../TaskDetail/TaskDetail";


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
    },
  };

function TaskCardModal({ isOpen, setIsOpen, name, description, sp, complex }) {

    // const [modalIsOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Modal
          isOpen={isOpen}
          style={customStyles}
          contentLabel="Task Card"
        >
            <TaskDetail isOpen={isOpen} setIsOpen={setIsOpen} namme={name} description={description} sp={sp} complex={complex}/>
        </Modal>
      </>
    );
  }


  export default TaskCardModal
