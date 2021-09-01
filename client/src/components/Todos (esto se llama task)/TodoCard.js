import React from 'react';
import styles from '../styles/TodoCard.module.css';

export default function TodoCard({name, description, sp, complex}) {
  complex = complex.replaceAll(" ", "_");

  return (
    <div className={styles.TodoCard}>
      <div className={styles.TodoCard_Header}>
        <h3>{name}</h3>
        <span className={styles.TodoCard_StoryPoints}>{sp} SP</span>
      </div>
      <div className={styles.TodoCard_Body}>
        <p>{description}</p>
      </div>
      <div className={`${styles.TodoCard_ComplexColorLine} ${complex === "easy_win" ? styles.easy_win 
      : complex === "worth_persuing_later" ? styles.worth_persuing_later 
      : complex === "desprioritize" ? styles.desprioritize : styles.strategic_initiatives}`}></div>
    </div>
  );
}
