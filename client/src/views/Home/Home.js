import { useState } from "react";
import { BsPlus } from "react-icons/bs";

import HomeModal from "../../components/HomeModal/HomeModal";
import ProjectHolder from "../../components/ProjectHolder/ProjectHolder";

import styles from "./Home.module.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
