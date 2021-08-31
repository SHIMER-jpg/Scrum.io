import React from 'react';

// components
import Todos from './Todos';

export default function DeveloperView() {
  return (
    <div className="DeveloperView">
      <div className="DeveloperView-Header">
        <h1>Project Name</h1>
      </div>
      <div className="DeveloperView-Body">
        {/* Componente de TODOS del usuario en este proyecto */}
        <Todos/>

        {/* Componente de TODOS que necesitan ayuda en este proyecto */}
        <Todos/>
      </div>
    </div>
  );
}
