import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Statistics.module.css";

// components
import StatisticCard from "../StatisticCard/StatisticCard";
import StatisticDeveloper from "../StatisticDeveloper/StatisticDeveloper";

export default function Statistics() {

  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <h1>Statistics</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.cardsList}>
          <StatisticCard graphType={""}/>
          <StatisticCard graphType={""}/>
          <StatisticCard graphType={""}/>
        </div>
        <div className={styles.specialCard}>
          <StatisticDeveloper />
        </div>
      </div>
    </div>
  );
}