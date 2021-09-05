/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import { useSearch } from "../../hooks/useSearch";
import { createTask, getTasksByProject } from "../../redux/ManagerView/actions";

import styles from "./CreateTaskModal.module.css";

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

const CreateTaskModal = ({
  isModalOpen,
  setIsModalOpen,
  assignedUsers,
  projectId,
}) => {
  const dispatch = useDispatch();
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [usersInProject, setUsersInProject] = useState([]);

  const loggedUser = useSelector((state) => state.app.loggedUser);

  const [values, setValues] = useState({
    title: "",
    assignedTo: "",
    storyPoints: "",
    priorization: "Easy Win",
    details: "",
  });

  const [query, setQuery, filteredUsers] = useSearch(usersInProject);

  useEffect(() => {
    const filteredUsers = assignedUsers
      .filter(({ user }) => user._id !== loggedUser._id)
      .map((u) => u.user);

    setUsersInProject(filteredUsers);
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (user) => {
    if (!values.assignedTo.includes(user._id)) {
      setValues({
        ...values,
        assignedTo: user._id,
      });
    }
    setQuery("");
  };

  const handleRemoveUser = () => {
    setValues({
      ...values,
      assignedTo: "",
    });
  };

  //FALTA VALIDAR EL FORM NO NOS OLVIDEMOS
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTask({ ...values, projectId }));
    dispatch(getTasksByProject(projectId));

    setValues({
      title: "",
      assignedTo: "",
      storyPoints: "",
      priorization: "",
      details: "",
    });

    setIsModalOpen(false);
  };

  return (
    <Modal style={customStyles} isOpen={isModalOpen}>
      <header className={styles.modalHeader}>
        <h2>Create task</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <form onSubmit={handleSubmit} className={styles.modalBody}>
        <div className={styles.modalFormGroup}>
          <label htmlFor="title">Title</label>
          <input
            value={values.title}
            onChange={handleChange}
            autoComplete="off"
            name="title"
            placeholder="Type the title of the task"
            id="title"
            type="text"
          />
        </div>

        <div
          className={`${styles.modalFormGroup} ${styles.selectUserContainer}`}
        >
          <label htmlFor="assignedTo">Assigned dev</label>
          <input
            onBlur={() => setIsSelectUsersOpen(false)}
            onFocus={() => setIsSelectUsersOpen(true)}
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={query}
            placeholder="Type a name..."
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div
            className={`${styles.modalSelectUser} ${
              isSelectUsersOpen ? styles.visible : undefined
            }`}
          >
            {filteredUsers.length ? (
              filteredUsers.map((user) => (
                <article
                  onClick={() => handleAddUser(user)}
                  key={user._id}
                  className={styles.modalUser}
                >
                  <img src={user.picture} alt={user.name} />
                  <p>{user.name}</p>
                </article>
              ))
            ) : (
              <p>There's no user with that name :(</p>
            )}
          </div>
        </div>
        <div className={styles.addedUsers}>
          {usersInProject
            .filter((user) => values.assignedTo.includes(user._id))
            .map((user) => (
              <article key={user._id} className={styles.addedUsersCard}>
                <img src={user.picture} alt={user.name} />
                <p>{user.name.split(" ")[0]}</p>
                <button onClick={() => handleRemoveUser(user)}>
                  <IoClose size={15} />
                </button>
              </article>
            ))}
        </div>
        <div className={styles.modalFormGroup}>
          <label htmlFor="storyPoints">Story points</label>
          <input
            autoComplete="off"
            name="storyPoints"
            id="storyPoints"
            placeholder="Type the amount of story points"
            type="number"
            value={values.storyPoints}
            onChange={handleChange}
          />
        </div>
        <div className={styles.modalFormGroup}>
          <label htmlFor="priorization">Priorization</label>
          <select
            value={values.priorization}
            onChange={handleChange}
            name="priorization"
            id="priorization"
          >
            <option value="Easy Win">Easy win</option>
            <option value="Deprioritize">Deprioritize</option>
            <option value="Worth Pursuing">Worth pursuing later</option>
            <option value="Strategic Initiative">Strategic initiative</option>
          </select>
        </div>
        <div className={styles.modalFormGroup}>
          <label htmlFor="details">Details</label>
          <textarea
            name="details"
            id="details"
            cols="15"
            placeholder="Type the taks's details..."
            value={values.details}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.modalFormGroup}>
          <button type="submit">Create task</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
