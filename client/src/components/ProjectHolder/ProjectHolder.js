import React from "react";
import styles from "./ProjectHolder.module.css";

//components
import ProjectCard from "../ProjectCard/ProjectCard.js";

export default function ProjectHolder({ finished, projectList }) { 
    // `finished` es un booleano para indicar si los proyectos que se mapearan estan terminados o siguen en curso

  return (
    <div className={styles.projects}>
      <div className={styles.projects_Header}>
        <h2>{finished ? "Finished" : "In Progress"}</h2>
      </div>
      <div className={styles.projectList}>
        {projectList && projectList.length > 0 ? (
          projectList.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))
        ) : (
          <h3>No Projects...</h3>
        )}
      </div>
    </div>
  );
}
