import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./StatisticCard.module.css";

export default function StatisticCard({ graphType }) {

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h1>Graph Name</h1>
        </div>
        <div className={styles.graph}>
          {/* aca va el grafico */}
        </div>
        <div className={styles.description}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </div>
    </div>
  );
}