import React, { useState } from "react";
import styles from "./TaskDetail.module.css";
import { sendForm } from "../../redux/DeveloperView/DeveloperViewActions";
import { useDispatch, useSelector } from "react-redux";

import mockupData from "./mockupDataDetail";

/**
 * 
  Line 52:39:  'title' is not defined              no-undef
  Line 54:13:  'scenario' is not defined           no-undef
  Line 56:13:  'assignedTo' is not defined         no-undef
  Line 58:13:  'creationDate' is not defined       no-undef
  Line 60:13:  'completedDate' is not defined      no-undef
  Line 62:13:  'taskBreakout' is not defined       no-undef
  Line 64:11:  'details' is not defined            no-undef
  Line 77:13:  'notes' is not defined              no-undef
 */
export default function TaskDetail(props) {
  const [status, setStatus] = useState("");
  const [priorization, setPriorization] = useState("");
  const [storyPoints, setStoryPoints] = useState("");

  const dispatch = useDispatch();

  const taskDetails = useSelector(({ developerView }) => {
    return developerView.taskDetails;
  });

  const taskId = props.match.params.id;

  function handleStatusSelect(e) {
    setStatus({
      ...status,
      [e.target.name]: e.target.value,
    });
  }

  function handlePriorizationSelect(e) {
    setPriorization({
      ...priorization,
      [e.target.name]: e.target.value,
    });
  }

  function handleArea(e) {
    setStatus({
      ...status,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    dispatch(sendForm(e));
  }

  function handleOnClick(e) {
    //  dispatch(modifyingTaskById(taskId));
  }

  return (
    <div>
      <div className={styles.titles}>{mockupData.title}</div>
      <div className={styles.titles}>Scenario</div>
      <div>{mockupData.scenario}</div>
      <div className={styles.titles}>Assigned to:</div>
      <div>{mockupData.assignedTo}</div>
      <div className={styles.titles}>Created: </div>
      <div>{mockupData.creationDate}</div>
      <div className={styles.titles}>Completed: </div>
      <div>{mockupData.completedDate}</div>
      <div className={styles.titles}>Task breakout: </div>
      <div>{mockupData.taskBreakout}</div>
      <div className={styles.titles}>Details: </div>
      <p>{mockupData.details}</p>
      <div className={styles.titles}>Notes: </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className={styles.notas}
          name="notes"
          id=""
          cols="30"
          rows="10"
          onChange={(e) => handleArea(e)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
      <div>{mockupData.notes}</div>
      <button onClick={(e) => handleOnClick(e)}>🤔 Ask for help</button>
      <select
        onChange={(e) => handleStatusSelect(e)}
        onClick={(e) => handleOnClick(e)}
      >
        <option value="">Status</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In progress</option>
        <option value="testing">Testing</option>
        <option value="completed">Completed</option>
      </select>
      <select
        onChange={(e) => handlePriorizationSelect(e)}
        onClick={(e) => handleOnClick(e)}
      >
        <option value="">Priorization</option>
        <option value="easyWin">Easy Win</option>
        <option value="depriorize">Depriorize</option>
        <option value="worthPursuing">Worth Pursuing</option>
        <option value="strategicInitiative">Strategic Initiative</option>
      </select>
    </div>
  );
}
