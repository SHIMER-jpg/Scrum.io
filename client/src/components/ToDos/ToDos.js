import React from 'react';

//components
import ToDoCard from '../ToDoCard/ToDoCard.js';

export default function ToDos() {
  return (
    <div className="ToDos">
      <div className="ToDos-Header">
        <h1>To Do</h1>
      </div>
      <div className="ToDoList">
        <ToDoCard 
          name={"Task Name"}
          description={"HolaHola, soy una descripcion de TODO"}
          sp={"99"}
          complex={"easy win"}
        />
      </div>
    </div>
  );
}
