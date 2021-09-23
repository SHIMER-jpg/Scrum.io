/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { getProjectByUserId } from "../../redux/Home/actions";

import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import ProjectHolder from "../../components/ProjectHolder/ProjectHolder";
import Loading from "../../components/Loading/Loading";
import { clearRole } from "../../redux/ViewRouter/actions";
import { clearMessages } from "../../redux/Chat/actions";

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
  }, [userLogged]);

  useEffect(() => {
    dispatch(clearRole());
    dispatch(clearMessages());
  }, []);

  return (
    <section className={styles.container}>
      <Helmet>
        <title>Home | Scrum.io</title>
      </Helmet>
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
          <>
            <ProjectHolder
              projectList={projectList.filter(
                ({ projects: { isCompleted } }) => !isCompleted
              )}
              finished={false}
            />
          </>
        )}
      </main>
      <main className={styles.projects}>
        {/* Proyectos en curso */}
        {isLoadingProjects ||
        projectList.filter(({ projects: { isCompleted } }) => isCompleted)
          .length < 1 ? (
          <></>
        ) : (
          <>
            <ProjectHolder
              projectList={projectList.filter(
                ({ projects: { isCompleted } }) => isCompleted
              )}
              finished={true}
            />
          </>
        )}
      </main>
      {isModalOpen && (
        <CreateProjectModal
          setIsLoadingProjects={setIsLoadingProjects}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default Home;
