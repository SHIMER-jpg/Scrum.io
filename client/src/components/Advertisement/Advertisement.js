import React from "react";
import styles from './Advertisement.module.css'

export default function Advertisement({title, description, date}) {
  return (
        <div className={styles.adContainer}>
          <h3 className={styles.title}>{title}</h3>
          <h4>{date}</h4>
          <h5>{description}</h5>
        </div>
  );
}