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


function CreateTaskModal({ModalOpen, setModalOpen}) {

    const users = useSelector((state) => state.home.users);


    function usersHandler(){
        alert("poder agregar usuarios, no me mates shimer")
        // abre un modal donde se visualizan los usuarios para poder agregar
    }

    return(
        <Modal 
        style={customStyles}
        isOpen={ModalOpen}
        onRequestClose={() => setModalOpen(false)}
        >
            <h3>Title</h3>
            <input type="text" placeholder="Add title" className={style.Title}/>
            <button onClick={() => usersHandler()}>Add users</button>
            <a href="https://meet.jit.si/" target="_blank">Meetin</a>
            <button onClick={ () => setModalOpen(false)}>Ready</button>

        </Modal>
    )

}



export default CreateTaskModal
