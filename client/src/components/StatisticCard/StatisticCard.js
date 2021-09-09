import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import {Line} from 'react-chartjs-2';

import styles from "./StatisticCard.module.css";

import moment from 'moment';
moment().format();

export default function StatisticCard({ graphType }) {

  let project = useSelector((state) => state.managerView.project);
  let tasks = useSelector((state) => state.managerView.tasks);

  let firstDay = project.creationDate && moment(project.creationDate.substring(0,10));
  let lastDay = project.requiredDate && moment(project.requiredDate.substring(0,10));
  let days = firstDay && lastDay.diff(firstDay, 'days')
  
  let dataDays = [];
  for(let i=0; i <= days; i++){
    dataDays[i] = i
  }

  if(tasks.length > 0) {
    var storyPoints = tasks.map(t => t.storyPoints).reduce((a,b) => a+b)
    storyPoints = parseInt(storyPoints, 10)
  }
  let storyPointsPerDay = parseFloat((storyPoints/days).toFixed(2))
  
  let sum = 0
  let dataStoryPoints = []
  for(let i=0; i <= days; i++){
    dataStoryPoints[i] = Math.round(sum);
    sum = sum + storyPointsPerDay;
  }

  let completedTasks = tasks && tasks.filter(t=> t.status == 'Completed').sort(function(a, b) {
    if (a.completedDate > b.completedDate) {
      return 1;
    }
    if (a.completedDate < b.completedDate) {
      return -1;
    }
    return 0;
  })
 
  let dates = completedTasks.map(t => t.completedDate)
  const aux= new Set(dates)
  let completedDates = Array.from(aux)

  let devStoryPoints = new Array(completedDates.length)
  for(let h=0; h < devStoryPoints.length; h++){
    devStoryPoints[h] = 0
  }

  for(let i=0; i < completedDates.length; i++){
    for(let j=0; j < completedTasks.length; j++){
      if(completedTasks[j].completedDate == completedDates[i]){
        devStoryPoints[i] = devStoryPoints[i] + completedTasks[j].storyPoints
      }
    }
  }

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h2>{graphType}</h2>
        </div>
        <div className={styles.graph}>

          {graphType === "Tasks Complexity Chart" ?

            <Bar className={styles.chart}
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
              option={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                      beginAtZero: true
                  }
                }
              }}

            />
          : graphType === "BurnDown Chart" ?
            <Line className={styles.chart}
            data={{
              labels: dataDays,
              datasets: [
              {
                label: 'Actual development',
                data: devStoryPoints,
                borderColor:['#a12464']
              },
              {
                label: 'Ideal development',
                data: dataStoryPoints.reverse(),
                borderColor:['#7BEFFF']
              }
            ]
            }}
            option={{
              maintainAspectRatio: false,
              scales: {
                y: {
                    beginAtZero: true
                }
              }
            }}
            />
          :
          <>
          </>
          }
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
