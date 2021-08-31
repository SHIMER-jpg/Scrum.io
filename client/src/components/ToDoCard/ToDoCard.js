import React from 'react';

export default function ToDoCard({name, description, sp, complex}) {
  return (
    <div className="ToDoCard">
      <div className="ToDoCard-Header">
        <h3>{name}</h3>
      </div>
      <div className="ToDoCard-Body">
        <span className="ToDoCard-StoryPoints">{sp}</span>
        <p>{description}</p>
      </div>
      <div className="ToDoCard-ComplexColorLine">
        {complex}
      </div>
    </div>
  );
}
