import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import styles from "./Calendary.module.css";
import { useSelector } from 'react-redux';



// Modal.setAppElement("#root");

const Calendary = function(){

  const userRole = useSelector(({ viewRouter }) => viewRouter.userRole);


  function handleDateClick(){
    alert("hola")
  }


 

  return(

    userRole ?
      <div>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin  ]}
          initialView="dayGridMonth"
          weekends={false}
          dateClick={handleDateClick}
        />
      </div>
    :
    null
  )
}
  
    



export default Calendary