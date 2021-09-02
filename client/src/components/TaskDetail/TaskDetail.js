import React, {useState} from "react";
import styles from './TaskDetail.module.css';
import yo from './mockupDataDetail';


export default function TaskDetail(){
   const {title, scenario, assignedTo, creationDate, completedDate, taskBreakout, details, notes} = yo
   const [status, setStatus] = useState('')
   const [storyPoints, setStoryPoints] = useState('')



   function handleStatusSelect(e){
      setStatus({
         ...status,
         [e.target.name] : e.target.value
      })
   }
   function handleStoryPointsSelect(e){
      setStoryPoints({
         ...storyPoints,
         [e.target.name] : e.target.value
      })
   }

   return (
      <div>
         <div className={styles.titles}>{title}</div>
         <div className={styles.titles}>Scenario</div>
         <div>{scenario}</div>
         <div className={styles.titles}>Assigned to:</div>
         <div>{assignedTo}</div>
         <div className={styles.titles}>Created: </div>
         <div>{creationDate}</div>
         <div className={styles.titles}>Completed: </div>
         <div>{completedDate}</div>
         <div className={styles.titles}>Task breakout: </div>
         <div>{taskBreakout}</div>
         <div className={styles.titles}>Details: </div>
         <p>{details}</p>
         <div className={styles.titles}>Notes: </div>
         <div>{notes}</div>
         <button>🤔 Ask for help</button>
         <select onChange={(e) => handleStatusSelect(e)}>
            <option value=''>Status</option>
            <option value='todo'>To do</option>
            <option value='needhelp'>Need help</option>
            <option value='pending'>Pending test</option>
            <option value='completed'>Completed</option>
         </select>
         <select onChange={(e) => handleStoryPointsSelect(e)}>
            <option value=''>Status</option>
            <option value='easyWin'>Easy Win</option>
            <option value='worthPursuingLater'>Worth Pursuing Later</option>
            <option value='strategicIniciatives'>Strategic Iniciatives</option>
            <option value='Desprioritize'>Desprioritize</option>
            <option value='Red'>Red</option>
            <option value='Violeta'>Violeta</option>
         </select>
      </div>
   )
}

