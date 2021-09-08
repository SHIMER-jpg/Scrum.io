import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import  { Bar, Line } from 'react-chartjs-2';
import styles from "./StatisticDeveloper.module.css";

export default function StatisticDeveloper(props) {
  const tasks = useSelector((state) => state.managerView.tasks);
  // console.log(tasks);
  const userTasks = tasks.filter((t) => t.asignedTo === "61377a66c16ac40924f9daa0");
  const completedUserTasks = userTasks.filter((t) => t.completedDate);
  // console.log(userTasks);
  // console.log(completedUserTasks);
  const labels = getLabels();
  const userData = getData(getDate("2021-09-25T00:00:00.000Z"), getDate("2021-09-17T00:00:00.000Z"), completedUserTasks);
  console.log(userData);

  //-------FUNCTIONS---------------------------------
  function getDate(date){         //converts date strings into integers
    return parseInt(date.slice(0, 10).replaceAll("-", ""));
  }

  function calculateDays(){        //calculates x axis values dinamically (in days)
    let finalDate = getDate("2021-09-25T00:00:00.000Z");
    let initialDate = getDate("2021-09-07T17:26:13.094Z");
    return finalDate - initialDate;
  }

  function getLabels(){           //creates an array with the calculated values to be set as labels
    var days = calculateDays();
    var labelArray = [];
    for(let i=0; i<days; i++){
      labelArray.push(i+1);
    }
    return labelArray;
  }

  function getData(finalDate, actualDate, tasks){  //creates a totalizer data object
    var days = calculateDays();
    var data = {quantity: [], storyPoints: []};
    for(let i=0; i<(finalDate - actualDate); i++){ //initializing both arrays in 0 for each position
      data.quantity.push(0);
      data.storyPoints.push(0);
    }
    tasks.forEach((t) =>    //mapping user tasks
      {
        data.quantity[finalDate - getDate(t.completedDate)]++   //counts completed task quantity
        data.storyPoints[finalDate - getDate(t.completedDate)] += t.storyPoints  //counts completed story points
      }
    )
    return data;
  }

  //-------RETURN-------------------------------------
  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h2>Developer Statistics</h2>
        </div>
        <div className={styles.graph}>

          <Bar className={styles.chart}
            data={{
              labels: labels,
              datasets: [{
                  type: 'bar',
                  label: 'Completed Tasks',
                  borderColor: 'rgb(54, 162, 235)',
                  borderWidth: 2,
                  backgroundColor: 'rgb(54, 162, 235)',
                  data: userData.quantity,
                },
                {
                  type: 'line',
                  label: 'Story Points',
                  backgroundColor: 'rgb(255, 99, 132)',
                  data: userData.storyPoints,
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
