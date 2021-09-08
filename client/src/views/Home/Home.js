import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { getProjectByUserId } from "../../redux/Home/actions";

import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import ProjectHolder from "../../components/ProjectHolder/ProjectHolder";
import Loading from "../../components/Loading/Loading";

import styles from "./Home.module.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const userLogged = useSelector((state) => state.app.loggedUser);
  const projectList = useSelector((state) => state.home.projectList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLogged._id) {
      dispatch(getProjectByUserId(userLogged._id, setIsLoadingProjects));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>My projects</h1>
        <button onClick={() => setIsModalOpen(true)}>
          <BsPlus size={20} /> Create project
        </button>
      </header>
      <main className={styles.projects}>
        {/* Proyectos en curso */}
        {isLoadingProjects ? (
          <Loading isCentered={false} />
        ) : (
          <ProjectHolder projectList={projectList} finished={false} />
        )}
        {/* Proyectos en curso */}
        {/* <ProjectHolder projectList={projectList} finished={true}/> */}
      </main>
      {isModalOpen && (
        <CreateProjectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </section>
  );
};

export default Home;
