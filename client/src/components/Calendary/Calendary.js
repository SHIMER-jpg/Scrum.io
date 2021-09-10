import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';



// Modal.setAppElement("#root");

const Calendary = function(){


  function handleDateClick(){
    alert("hola")
  }


 

  return(
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin  ]}
      initialView="dayGridMonth"
      weekends={false}
      dateClick={handleDateClick}
    />
  )
}
  
    



export default Calendary