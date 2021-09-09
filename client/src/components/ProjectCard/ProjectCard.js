import React from "react";
import styles from "./ProjectCard.module.css";
import { useHistory } from "react-router";

export default function ProjectCard({ project, role }) {
  const history = useHistory();
  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <h2>{project.projectName}</h2>
        {role == "scrumMaster" ? <p>Scrum Master</p> : <p>Developer</p>}
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.title}>
            <h3>Description</h3>
            <div></div>
          </div>
          <p>{project.description}</p>
        </div>
        <div className={styles.status}>
          <div className={styles.title}>
            <h3>Progress</h3>
            <div></div>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${project.status || 0}%` }}
            ></div>
          </div>
          <h4>{(project.status || 0) + "%"}</h4>
        </div>
      </div>
      <div className={styles.projectItem}>
        <button
          onClick={() => {
            history.push("/project/" + project._id);
          }}
        >
          See details
        </button>
      </div>
    </div>
  );
}
