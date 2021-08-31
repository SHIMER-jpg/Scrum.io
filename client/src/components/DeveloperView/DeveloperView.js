import React from 'react';

// components
import ToDos from '../ToDos/ToDos.js';

export default function DeveloperView() {
  return (
    <div className="DeveloperView">
      <div className="DeveloperView-Header">
        <h1>Project Name</h1>
      </div>
      <div className="DeveloperView-Body">
        {/* Componente de TODOS del usuario en este proyecto */}
        <ToDos/>

        {/* Componente de TODOS que necesitan ayuda en este proyecto */}
        <ToDos/>
      </div>
    </div>
  );
}
