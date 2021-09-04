import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { getProjectByUserId } from "../../redux/Home/actions";

import HomeModal from "../../components/HomeModal/HomeModal";
import ProjectHolder from "../../components/ProjectHolder/ProjectHolder";

import styles from "./Home.module.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userLogged = useSelector(state => state.app.loggedUser);
  const projectList = useSelector(state => state.home.projectList);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userLogged._id){
      dispatch(getProjectByUserId(userLogged._id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged])

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
        <ProjectHolder projectList={projectList} finished={false}/>
        {/* Proyectos en curso */}
        <ProjectHolder projectList={projectList} finished={true}/>
      </main>
      {isModalOpen && (
        <HomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </section>
  );
};

export default Home;
