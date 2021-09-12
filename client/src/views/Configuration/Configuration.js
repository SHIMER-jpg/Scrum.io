import { useDispatch, useSelector } from "react-redux";
import { change } from "../../redux/PokerPlanning/actions";
import { deleteProject } from "../../redux/ManagerView/actions";
import { useState } from "react";
import styles from "./Configuration.module.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useHistory } from "react-router";

export function Configuration() {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleChange(e) {
    dispatch(change(e.target.value));
  }

  const userRole = useSelector((state) => state.viewRouter.userRole);
  const project = useSelector((state) => state.managerView.project);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
    // dispatch(deleteProject(project._id));
    history.push("/");
  };

  return (
    <div className={styles.conteiner}>
      <header className={styles.header}>
        <h1>User Configs</h1>
      </header>
      <br></br>
      {userRole === "scrumMaster" && (
        <>
          <header className={styles.header}>
            <h1>Project Config</h1>
          </header>
          <div className={styles.modalFormGroup}>
            <label>Poker Planning voting system</label>
            <select
              name="voting"
              className={styles.select}
              onChange={(e) => handleChange(e)}
            >
              <option hidden>Voting system</option>
              <option value="0,1,2,3,5,8,13,21,34,55,89,?">
                Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)
              </option>
              <option value="0,1/2,1,2,3,5,8,13,20,40,100,?">
                Modified Fibonacci (0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?)
              </option>
              {/* <option value="xxs,xs,m,l,xl,xxl,?">
                T-shirts (xxs, xs, m, l, xl, xxl, ?)
              </option> */}
              <option value="0,1,2,4,8,16,32,64,?">
                Power of 2 (0, 1, 2, 4, 8, 16, 32, 64, ?)
              </option>
            </select>
          </div>
          <div className={`${styles.modalFormGroup} ${styles.delete}`}>
            <label>Delete Project</label>
            <button onClick={handleClick}>DELETE</button>
          </div>
        </>
      )}
      {isModalOpen && (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          deleteHandler={handleDelete}
          confirmationString={project.projectName}
        />
      )}
    </div>
  );
}
