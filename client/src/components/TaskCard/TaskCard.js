import React, { useEffect , useState} from "react";
import styles from "./TaskCard.module.css";
import Modal from "react-modal";

export default function TaskCard({ name, description, sp, complex }) {

  return (
    <div className={`${styles.taskCard} ${styles[complex]}`}>
      <div className={styles.taskCard_Header}>
        <h3>{name}</h3>
        <span className={styles.taskCard_StoryPoints}>{sp} SP</span>
      </div>
      <div className={styles.taskCard_Body}>
        <p>{description}</p>
      </div>
      <div
        className={`${styles.taskCard_ComplexColorLine} ${
          complex === "easy_win"
            ? styles.easy_win
            : complex === "worth_persuing_later"
            ? styles.worth_persuing_later
            : complex === "desprioritize"
            ? styles.desprioritize
            : styles.strategic_initiatives
        }`}
      ></div>
    </div>
  );
}
