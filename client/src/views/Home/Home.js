import { useState } from "react";
import Modal from "react-modal";
import { BsPlus } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import { useSearch } from "../../hooks/useSearch";

import styles from "./Home.module.css";
import data from "../../__mocks__/homeUsersData";

// a11y
Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.5)";
Modal.defaultStyles.content.padding = "40px";
Modal.defaultStyles.content.borderRadius = "8px";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    requiredDate: "",
    springsAmount: "",
    springDuration: "",
    users: [],
  });
  const [query, setQuery, filteredUsers] = useSearch(data);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (user) => {
    if (!values.users.includes(user.id)) {
      setValues({
        ...values,
        users: [...values.users, user.id],
      });
    }
    setQuery("");
  };

  const handleRemoveUser = (user) => {
    setValues({
      ...values,
      users: values.users.filter((u) => u !== user.id),
    });
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>My projects</h1>
        <button onClick={() => setIsModalOpen(true)}>
          <BsPlus size={20} /> Create project
        </button>
      </header>
      <main className={styles.projects}>
        <article className={styles.project}>
          <h2>Proyecto grupal</h2>
          <div className={styles.projectItem}>
            <div className={styles.projectItemTitle}>
              <p>Description</p>
              <div></div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              similique totam quibusdam officiis! Provident excepturi ad
              deserunt illum exercitationem in minima beatae laborum, molestiae
              iure omnis. Officiis perspiciatis nobis voluptatem.
            </p>
          </div>
          <div className={styles.projectItem}>
            <div className={styles.projectItemTitle}>
              <p>Progress</p>
              <div></div>
            </div>
            <div className={styles.progress}>
              <div></div>
              <p>75%</p>
            </div>
          </div>
          <div className={styles.projectItem}>
            <button>See details</button>
          </div>
        </article>
      </main>
      <Modal
        style={{ content: { maxWidth: "650px", margin: "0 auto" } }}
        isOpen={isModalOpen}
      >
        <header className={styles.modalHeader}>
          <h2>Create project</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <IoClose size={30} />
          </button>
        </header>
        <main className={styles.modalBody}>
          <div className={styles.modalFormGroup}>
            <label htmlFor="title">Title</label>
            <input
              value={values.title}
              onChange={handleChange}
              autoComplete="off"
              name="title"
              id="title"
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
            <label htmlFor="springsAmount">Amount of springs</label>
            <input
              autoComplete="off"
              name="springsAmount"
              id="springsAmount"
              type="number"
              value={values.springsAmount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalFormGroup}>
            <label htmlFor="springDuration">Spring duration</label>
            <input
              autoComplete="off"
              name="springDuration"
              id="springDuration"
              type="number"
              value={values.springDuration}
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
              name="users"
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
                    key={user.id}
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
            <div className={styles.addedUsers}>
              {data
                .filter((user) => values.users.includes(user.id))
                .map((user) => (
                  <article key={user.id} className={styles.addedUsersCard}>
                    <img src={user.picture} alt={user.name} />
                    <p>{user.name.split(" ")[0]}</p>
                    <button onClick={() => handleRemoveUser(user)}>
                      <IoClose size={15} />
                    </button>
                  </article>
                ))}
            </div>
          </div>
        </main>
      </Modal>
    </section>
  );
};

export default Home;
