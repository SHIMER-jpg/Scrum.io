import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";

import { useSearch } from "../../hooks/useSearch";
import { createProject } from "../../redux/Home/actions";

import data from "../../__mocks__/homeUsersData";
import styles from "./HomeModal.module.css";

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
  },
};

const HomeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [values, setValues] = useState({
    projectName: "",
    requiredDate: "",
    sprintCount: "",
    sprintDuration: "",
    Users: [],
    description: "",
  });
  const [query, setQuery, filteredUsers] = useSearch(data);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (user) => {
    console.log(user);
    if (!values.Users.includes(user._id)) {
      setValues({
        ...values,
        Users: [...values.Users, user._id],
      });
    }
    setQuery("");
  };

  const handleRemoveUser = (user) => {
    setValues({
      ...values,
      Users: values.Users.filter((u) => u !== user._id),
    });
  };

  //FALTA VALIDAR EL FORM NO NOS OLVIDEMOS
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(values));
    console.log(values);
    setIsModalOpen(false);
    setValues({
      title: "",
      requiredDate: "",
      springsAmount: "",
      springDuration: "",
      Users: [],
      description: "",
    });
  };

  return (
    <Modal style={customStyles} isOpen={isModalOpen}>
      <header className={styles.modalHeader}>
        <h2>Create project</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <form onSubmit={handleSubmit} className={styles.modalBody}>
        <div className={styles.modalFormGroup}>
          <label htmlFor="projectName">Title</label>
          <input
            value={values.projectName}
            onChange={handleChange}
            autoComplete="off"
            name="projectName"
            placeholder="Type the name of the project"
            id="projectName"
            type="text"
          />
        </div>
        <div className={styles.modalFormGroup}>
          <label htmlFor="requiredDate">Required date</label>
          <input
            autoComplete="off"
            name="requiredDate"
            id="requiredDate"
            type="date"
            value={values.requiredDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.modalFormGroup}>
          <label htmlFor="sprintCount">Amount of sprints</label>
          <input
            autoComplete="off"
            name="sprintCount"
            id="sprintCount"
            placeholder="Type the amount of sprints"
            type="number"
            value={values.sprintCount}
            onChange={handleChange}
          />
        </div>
        <div className={styles.modalFormGroup}>
          <label htmlFor="sprintDuration">Sprint duration</label>
          <input
            autoComplete="off"
            name="sprintDuration"
            id="sprintDuration"
            placeholder="Type the duration of the sprints"
            type="number"
            value={values.sprintDuration}
            onChange={handleChange}
          />
        </div>
        <div
          className={`${styles.modalFormGroup} ${styles.selectUserContainer}`}
        >
          <label>Users</label>
          <input
            onBlur={() => setIsSelectUsersOpen(false)}
            onFocus={() => setIsSelectUsersOpen(true)}
            type="text"
            name="Users"
            value={query}
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
          {data
            .filter((user) => values.Users.includes(user._id))
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
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="15"
            placeholder="Type a description..."
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.modalFormGroup}>
          <button type="submit">Create project</button>
        </div>
      </form>
    </Modal>
  );
};

export default HomeModal;
