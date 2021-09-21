import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import style from "./CalendaryModal.module.css"


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


function CreateTaskModal({ModalOpen, setModalOpen, date}) {

    const users = useSelector((state) => state.home.users);
    const initialState = {title: ""}


    const [datos, setDatos] = useState(initialState)

    const {title} = datos



    function handlerUsers(){
        alert("poder agregar usuarios, no me mates shimer")
        // abre un modal donde se visualizan los usuarios para poder agregar
    }

    function handleConfirm(){
      setModalOpen(false)
      
    }

    function changeHandler(e){
      setDatos({
        ...datos,
        title: e.target.value
      })
    }
    
    function handleClose(){
      setDatos(initialState)
      setModalOpen(false)
    }


    return(
        <Modal 
        style={customStyles}
        isOpen={ModalOpen}
        onRequestClose={() => setModalOpen(false)}
        >
            <h3>Title</h3>
            <h3>{date}</h3>
            <input onChange={(e) => changeHandler(e)} value={title} type="text" placeholder="Add title" className={style.Title}/>
            <button onClick={() => handlerUsers()}>Add users</button>
            <a href="https://meet.jit.si/" target="_blank">Meetin</a>
            <button onClick={ () => handleConfirm()}>Confirm</button>
            <button onClick= {() => handleClose()}>X</button>

        </Modal>
    )

}



export default CreateTaskModal
