import React, {useState} from "react";
import { RiQuestionLine } from "react-icons/fa";

export default function TaskDetail({title, taskBreakout, scenario, notes}){

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
          ...status,
          [e.target.name] : e.target.value
      })
   }

   return (
      <div>
         <div>{title}</div>
         <div>Escenario</div>
         <div>{scenario}</div>
         <div>Asignada a:</div>
         <div>{assignedTo}</div>
         <div>Creada en: </div>
         <div>{creationDate}</div>
         <div>Completada en: </div>
         <div>{completedDate}</div>
         <div>Task breakout: </div>
         <div>Task breakout</div>
         <div>{taskBreakout}</div>
         <div>Notes</div>
         <div>{notes}</div>
         <div>{storyPoints}</div>
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
             <option value='easyWin'>To do</option>
             <option value='worthPursuingLater'>Need help</option>
             <option value='strategicIniciatives'>Pending test</option>
             <option value='Desprioritize'>Completed</option>
             <option value='Red'>Completed</option>
             <option value='Violeta'>Completed</option>
         </select>
         <div>{proyectId}</div>
      </div>
   )
}


// +storyPoints: Integer
// +priorization: String Enum
// +details: String
// +helpNeeded: Boolean
// +proyect: ProyectId
