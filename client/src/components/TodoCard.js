import React from 'react';

export default function TodoCard({name, description, sp, complex}) {
  return (
    <div className="TodoCard">
      <div className="TodoCard-Header">
        <h3>{name}</h3>
      </div>
      <div className="TodoCard-Body">
        <span className="TodoCard-StoryPoints">{sp}</span>
        <p>{description}</p>
      </div>
      <div className="TodoCard-ComplexColorLine">
        {complex}
      </div>
    </div>
  );
}
