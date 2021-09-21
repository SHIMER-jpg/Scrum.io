import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';
import CalendaryModal from "../CalendaryModal/CalendaryModal";
import style from "./Calendary.module.css"



const date = 0

const Calendary = function(){

  // const userRole = useSelector(({ viewRouter }) => viewRouter.userRole);
  const [ModalOpen, setModalOpen] = useState(false)
  const [date, setDate] = useState()

  function handleDateClick(dateClickInfo){
    setDate(dateClickInfo.dateStr)
    setModalOpen(true)
  }


  return(
      <div className= {style.calendar}>
        
        <CalendaryModal ModalOpen= {ModalOpen} setModalOpen= {setModalOpen} date={date}/>
        <FullCalendar
          headerToolbar = {{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          themeSystem= "standard"
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          weekends={true}
          selectable={true}
          dateClick={handleDateClick}
        />
      </div>
  )
}




export default Calendary




// export default function Calendar({buildingId, user}) {
//   const alerts_building = useSelector(state => state.alertsReducer.findAlertsBuilding);
//   const [displayPopUp, setDisplayPopUp] = useState(false);
//   const [alertProps, setAlertProps] = useState({});
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//       dispatch(findAlertsBuilding(buildingId))
//   }, [dispatch])

//   const eventsCalendar = alerts_building.filter(e => e.importance === 'alta' || e.importance === 'media').map(e => e = {title: e.concept, date: e.date, detail: e.details, importance: e.importance, AlertId: e.id });

//   const handleEventClick = (clickInfo) => {
//       setAlertProps({
//           id: clickInfo.event.extendedProps.AlertId,
//           title: clickInfo.event.title,
//           detail: clickInfo.event.extendedProps.detail,
//           importance: clickInfo.event.extendedProps.importance
//       })
//       setDisplayPopUp(true);
//   }
  
//   return(
//       <>
//       <PopUp user= {user} display={displayPopUp} setDisplay={setDisplayPopUp} alertProps = {alertProps}/>
//       <FullCalendar
//       locale = {esLocale}
//       plugins={[ dayGridPlugin, interactionPlugin ]}
//       headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: '',
//       }}
//       selectable={true}
//       selectMirror={true}
//       dayMaxEvents={true}
//       initialView="dayGridMonth"
//       weekends={true}
//       events={eventsCalendar}
//       eventContent={renderEventContent}
//       eventClick={handleEventClick}
//     />
//     </>
//   )
// }

// function renderEventContent(eventInfo) {
//   return (
//       <div className = "event">
//           {eventInfo.event.title.split("").slice(0,20).join("") + '...'}
//       </div>
//   )
// }