import React from "react";


export default function Advertisement({title, description}) {
  return (
    <div>
        <div>{title} </div>
        <div>{description}</div>
    </div>
  );
}