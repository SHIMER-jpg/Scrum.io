import React from "react";
import styles from "./ProjectHolder.module.css";

//components
import ProjectCard from "../ProjectCard/ProjectCard.js";

export default function ProjectHolder({ finished, projectList }) {
  // `finished` es un booleano para indicar si los proyectos que se mapearan estan terminados o siguen en curso

  // esto seria para filtrar los proyectos por terminados o no terminados, esta comentado porque algunos se cargaron mal a la bd y no tienen status
  // if(finished){
  //   projectList = projectList.filter(project => project.projects.status === 100);
  // }
  // else{
  //   projectList = projectList.filter(project => project.projects.status < 100);
  // }

  return (
    <div className={styles.projects}>
      <div className={styles.projects_Header}>
        <h2>{finished ? "Finished" : "In Progress"}</h2>
        <div></div>
      </div>
      <div className={styles.projectList}>
        {projectList && projectList.length > 0 ? (
          projectList
            .sort(
              ({ projects: a }, { projects: b }) =>
                new Date(b.creationDate) - new Date(a.creationDate)
            )
            .map((project) => (
              <ProjectCard
                key={project.projects._id}
                project={project.projects}
              />
            ))
        ) : (
          <h3>No Projects...</h3>
        )}
      </div>
    </div>
  );
}
