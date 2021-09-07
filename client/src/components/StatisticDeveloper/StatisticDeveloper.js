import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import  { Bar, Line } from 'react-chartjs-2';
import styles from "./StatisticDeveloper.module.css";

export default function StatisticDeveloper(props) {
  const tasks = useSelector((state) => state.managerView.tasks);
  const userTasks = tasks.filter((t) => t.asignedTo === "61377a66c16ac40924f9daa0");
  // console.log(userTasks);
  //debería recuperar las fechas de las tareas completadas, obtener la cantidad de cada dia y sus sp

  function calculateDays(){
    let finalDate = parseInt("2021-09-25T00:00:00.000Z".slice(0, 10).replaceAll("-", ""));
    let initialDate = parseInt("2021-09-07T17:26:13.094Z".slice(0, 10).replaceAll("-", ""));
    let days = finalDate - initialDate;
    return days;
  }

  function getLabels(){
    return "";
  }

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h1>Developer Statistics</h1>
        </div>
        <div className={styles.graph}>

          {/* mixed chart */}
          <Bar
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
                {
                  type: 'bar',
                  label: 'Completed Tasks',
                  borderColor: 'rgb(54, 162, 235)',
                  borderWidth: 2,
                  backgroundColor: 'rgb(54, 162, 235)',
                  data: [2, 1, 1, 2],
                },
                {
                  type: 'line',
                  label: 'Story Points',
                  backgroundColor: 'rgb(255, 99, 132)',
                  data: [7, 2, 7, 10],
                  borderColor: 'rgb(255, 99, 132)',
                  borderWidth: 4,
                },
              ],
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
