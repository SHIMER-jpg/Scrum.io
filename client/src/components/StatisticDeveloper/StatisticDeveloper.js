import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import  { Bar, Line } from 'react-chartjs-2';
import styles from "./StatisticDeveloper.module.css";

export default function StatisticDeveloper(props) {

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h2>Developer Statistics</h2>
        </div>
        <div className={styles.graph}>
          
          <Bar className={styles.chart}
            data={{
              labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
              datasets: [{
                  type: 'bar',
                  label: 'Completed Tasks',
                  borderColor: 'rgb(54, 162, 235)',
                  borderWidth: 2,
                  backgroundColor: 'rgb(54, 162, 235)',
                  data: [1, 1, 2, 2],
                },
                {
                  type: 'line',
                  label: 'Story Points',
                  backgroundColor: 'rgb(255, 99, 132)',
                  data: [12, 3, 15, 8],
                  borderColor: 'rgb(255, 99, 132)',
                  borderWidth: 4,
                },
              ],
            }}
            option={{
              maintainAspectRatio: false,
              scales: {
                y: {
                    beginAtZero: true
                }
              }
            }}
            height={100}
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
