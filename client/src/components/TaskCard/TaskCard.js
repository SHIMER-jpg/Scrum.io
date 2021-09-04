import React from "react";
import { useDispatch } from "react-redux";
import styles from "./TaskCard.module.css";
import { CONSTANTS } from '../../redux/DeveloperView/DeveloperViewConstants';

  export default function TaskCard(props) {


  const dispatch = useDispatch()


  function handledispatch (){
    // dispatch(setTaskDetails(props))
  }


  return (
    <div className={styles.taskCard} onClick={(e) => handledispatch()}>
      <div className={styles.taskCard_Header}>
        <h3>{props.title}</h3>
        <span className={styles.taskCard_StoryPoints}>{props.storyPoints} SP</span>
      </div>
      <div className={styles.taskCard_Body}>
        <p>{props.details}</p>
      </div>
      <div
        className={`${styles.taskCard_ComplexColorLine} ${
          props.priorization === "easy_win"
            ? styles.easy_win
            : props.priorization === "worth_persuing_later"
            ? styles.worth_persuing_later
            : props.priorization === "desprioritize"
            ? styles.desprioritize
            : styles.strategic_initiatives
        }`}
      ></div>
    </div>
  );
}
