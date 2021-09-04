import React, {useState} from "react";
import styles from './TaskDetail.module.css';
import yo from './mockupDataDetail';
import { createNote, sendForm } from "../../redux/DeveloperView/DeveloperViewActions"
import { useDispatch, useSelector } from "react-redux";



export default function TaskDetail(){

   const {title, scenario, assignedTo, creationDate, completedDate, taskBreakout, details, notes} = yo
   const [status, setStatus] = useState('')
   const [storyPoints, setStoryPoints] = useState('')
   
   const dispatch = useDispatch()


   const taskDetails = useSelector(({developerView}) => {
      return developerView.taskDetails
   }) 

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

   function handleArea(e){
      setStatus({
         ...status,
         [e.target.name] : e.target.value
      })
   }

   function handleSubmit(e){
      dispatch(createNote(e))
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
         <form onSubmit={(e) => handleSubmit(e)}>
         <textarea className={styles.notas} name="notes" id="" cols="30" rows="10" onChange ={(e) => handleArea(e)}></textarea>
         <button type="submit">Create</button>
         </form>
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

