import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatisticCard from '../StatisticCard/StatisticCard.js';
import StatisticDeveloper from '../StatisticDeveloper/StatisticDeveloper.js';
import styles from "./Statistics.module.css";

export default function Statistics() {

  return (
    <div className={styles.conteiner}>
      <div>
        <StatisticCard/>
      </div>
      <div>
        <StatisticDeveloper/>
      </div>
    </div>
  );
}
