import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";

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

          <Bar 
            data = {{
              labels: ["Easy Win", "Strategic Initiatives", "Worth Persuing Later", "Desprioritize"],
              datasets: [{
                axis: 'y',
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: [
                  '#8EFF7B',
                  '#7BEFFF',
                  '#FFA53C',
                  '#FF6868',
                ],
                borderColor: [
                  '#8EFF7B',
                  '#7BEFFF',
                  '#FFA53C',
                  '#FF6868',
                ],
                borderWidth: 1
              }]
            }}
          
          />
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