import React from 'react';
import styles from './TaskCard.module.css';

//components
import TaskCard from './TaskCard.js';

// coso
import PROJECTS from './../../../hardcodingDataBD';

export default function Tasks() {
  return (
    <div className={styles.tasks}>
      <div className={styles.tasks_Header}>
        <h2>To Do</h2>
      </div>
      <div className={styles.taskList}>
        {PROJECTS.length > 0 && PROJECTS[0].taskList.map(pro => <TodoCard 
          name={pro.title}
          description={pro.description}
          sp={pro.storypoint}
          complex={pro.complexitymatrix}
        />)}
      </div>
    </div>
  );
}
