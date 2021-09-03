import { useState, useDispatch } from "react";
import { BsPlus } from "react-icons/bs";
import HomeModal from "../../components/HomeModal/HomeModal";

import styles from "./Home.module.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [values, setValues] = useState({
    projectName: "",
    requiredDate: "",
    sprintCount: "",
    sprintDuration: "",
    users: [],
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
    if (!values.Users.includes(user.id)) {
      setValues({
        ...values,
        Users: [...values.Users, user.id],
      });
    }
    setQuery("");
  };

  const handleRemoveUser = (user) => {
    setValues({
      ...values,
      Users: values.Users.filter((u) => u !== user.id),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(values));
    console.log(values);

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
      {isModalOpen && (
        <HomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </section>
  );
};

export default Home;
