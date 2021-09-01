import React from 'react';
import styles from '../styles/DeveloperView.module.css';

// components
import Todos from './Todos';

export default function DeveloperView() {
  return (
    <div className={styles.DeveloperView}>
      <div className={styles.DeveloperView_Header}>
        <h1>Project Name</h1>
      </div>
      <div className={styles.DeveloperView_Body}>
        {/* Componente de TODOS del usuario en este proyecto */}
        <Todos/>

        {/* Componente de TODOS que necesitan ayuda en este proyecto */}
        <Todos/>
      </div>
    </div>
  );
}
