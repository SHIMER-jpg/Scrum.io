import React from 'react';

//components
import TodoCard from './TodoCard.js';

export default function Todos() {
  return (
    <div className="Todos">
      <div className="Todos-Header">
        <h1>To Do</h1>
      </div>
      <div className="TodoList">
        <TodoCard 
          name={"Task Name"}
          description={"HolaHola, soy una descripcion de TODO"}
          sp={"99"}
          complex={"easy win"}
        />
      </div>
    </div>
  );
}
