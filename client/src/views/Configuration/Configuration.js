import { useDispatch, useSelector } from "react-redux";
import { deleteProject, deleteTasks } from "../../redux/ManagerView/actions";
import { useState } from "react";
import styles from "./Configuration.module.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useHistory } from "react-router";
import { editProject } from "../../redux/ManagerView/actions";

export function Configuration() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userRole = useSelector((state) => state.viewRouter.userRole);
  const project = useSelector((state) => state.managerView.project);

  const [deleteProjectModal, setDeleteProjectModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickProject = (e) => {
    setDeleteProjectModal(true);
  };

  const handleDeleteProject = () => {
    setDeleteProjectModal(false);
    dispatch(deleteProject(project._id));
    history.push("/");
  };

  const handleClickTasks = (e) => {
    setIsModalOpen(true);
  };

  const handleDeleteTasks = () => {
    setIsModalOpen(false);
    dispatch(deleteTasks(project._id));
    history.push("/");
  };

  const handleCompleteProject = () => {
    dispatch(
      editProject({ id: project._id, field: "isCompleted", value: true })
    );
    dispatch(editProject({ id: project._id, field: "status", value: 100 }));
  };

  return (
    <div className={styles.conteiner}>
      <br></br>
      {userRole === "scrumMaster" ? (
        <>
          <header className={styles.header}>
            <h1>Project Delete</h1>
          </header>

          <div className={`${styles.modalFormGroup}`}>
            <div className={styles.Pair}>
              <label>Mark Project as Completed</label>
              <button onClick={handleCompleteProject}>COMPLETE</button>
            </div>
          </div>
          <div className={`${styles.modalFormGroup} ${styles.delete}`}>
            <div className={styles.dangerPair}>
              <label>Delete Tasks</label>
              <button onClick={handleClickTasks}>DELETE</button>
            </div>
            <div className={styles.dangerPair}>
              <label>Delete Project</label>
              <button onClick={handleClickProject}>DELETE</button>
            </div>
          </div>
        </>
      ) : (
        <p>Nothing to see here yet...</p>
      )}
      {deleteProjectModal && (
        <DeleteModal
          isModalOpen={deleteProjectModal}
          setIsModalOpen={setDeleteProjectModal}
          deleteHandler={handleDeleteProject}
          confirmationString={project.projectName}
          type="project"
        />
      )}

      {isModalOpen && (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          deleteHandler={handleDeleteTasks}
          confirmationString={project.projectName}
          type="tasks"
        />
      )}
    </div>
  );
}
