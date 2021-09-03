import React from "react";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {

  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <h2>{project.projectName}</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{project.description}</p>
        </div>
        <div className={styles.status}>
          <h3>Progress</h3>
          <div className={styles.progressBar}>
            <div className={styles.progress}></div>
            <h4>{project.status}</h4>
          </div>  
        </div>
      </div>
    </div>
  );
}
