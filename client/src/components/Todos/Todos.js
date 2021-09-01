import React from 'react';
import styles from '../styles/TodoCard.module.css';

//components
import TodoCard from './TodoCard.js';

// coso
import PROJECTS from './../../../hardcodingDataBD';

export default function Todos() {
  return (
    <div className={styles.Todos}>
      <div className={styles.Todos_Header}>
        <h2>To Do</h2>
      </div>
      <div className={styles.TodoList}>
        {PROJECTS.length > 0 && PROJECTS[0].todoList.map(pro => <TodoCard 
          name={pro.title}
          description={pro.description}
          sp={pro.storypoint}
          complex={pro.complexitymatrix}
        />)}
      </div>
    </div>
  );
}
