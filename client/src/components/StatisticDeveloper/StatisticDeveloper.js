import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chart, Line } from 'react-chartjs-2';
import styles from "./StatisticDeveloper.module.css";

export default function StatisticDeveloper(props) {
  var mixedChart = new Chart( {
    data: {
      datasets: [{
        type: "line",
        label: "Pepe's Completed Tasks",
        data: [1, 1, 2, 2, 1]
      }, {
        type: "bar",
        label: "Pepe's Story Points",
        data: [12, 3, 10, 8, 5]
      }]
    }
  })

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h1>Developer Statistics</h1>
        </div>
        <div className={styles.graph}>

          {/* mixed chart */}
          <div></div>
          <Line
            data={{
              labels: ["day 1", "day 2", "day 3", "day 4", "day 5"],
              datasets: [{
                label: "Pepe's Story Points",
                data: [12, 3, 15, 8],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.05
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
            height={800}
            width={1000}
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
