import React from "react";
import styles from './Advertisement.module.css'

export default function Advertisement({title, description, date}) {
  return (
        <div className={styles.adContainer}>
          <div className={styles.note}>
            <div className={styles.title}>{title}</div>
            <div className={styles.date}>{date.substring(0,10)}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
  );
}