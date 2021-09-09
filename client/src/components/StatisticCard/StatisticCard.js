/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";

// componentes
import PopperHelp from "../PopperHelp/PopperHelp.js";

// componentes charts de chartjs
import { Bar } from "react-chartjs-2";
import {Line} from 'react-chartjs-2';

import styles from "./StatisticCard.module.css";

import moment from 'moment';
moment().format();

export default function StatisticCard({graphType, tasks, project}) {
  const [graphData, setGraphData] = useState({
    byStoryPoints: [],
    byTasks: [],
  })

  // se encarga de setear los datos de los graficos
  useEffect(() => {
    if(tasks.length > 0){
      setGraphData({
        ...graphData,
        byStoryPoints: charDataByStoryPoints(),
        byTasks: charDataByTasks(),
      })
    }
  },[tasks])

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
  // funcion para setear la data por StoryPoints
  function charDataByStoryPoints(){
    var charData = [0,0,0,0];
    if(graphType === "Tasks Priorization Chart"){
      tasks.forEach(t => {
        if(t.priorization === "Easy Win"){
          charData[0] += t.storyPoints;
        }
        else if(t.priorization === "Strategic Initiative"){
          charData[1] += t.storyPoints;
        }
        else if(t.priorization === "Worth Pursuing"){
          charData[2] += t.storyPoints;
        }
        else if(t.priorization === "Deprioritize"){
          charData[3] += t.storyPoints;
        }
      });
    }
    else if(graphType === "Project Report"){
      tasks.forEach(t => {
        if(t.priorization === "Pending"){
          charData[0] += t.storyPoints;
        }
        else if(t.priorization === "In progress"){
          charData[1] += t.storyPoints;
        }
        else if(t.priorization === "Testing"){
          charData[2] += t.storyPoints;
        }
        else if(t.priorization === "Completed"){
          charData[3] += t.storyPoints;
        }
      });
    }
    return charData;
  }
  // funcion para setear la data por tasks
  function charDataByTasks(){
    var charData = [0,0,0,0];
    if(graphType === "Tasks Priorization Chart"){
      tasks.forEach(t => {
        if(t.priorization === "Easy Win"){
          charData[0] += 1;
        }
        else if(t.priorization === "Strategic Initiative"){
          charData[1] += 1;
        }
        else if(t.priorization === "Worth Pursuing"){
          charData[2] += 1;
        }
        else if(t.priorization === "Deprioritize"){
          charData[3] += 1;
        }
      });
    }
    else if(graphType === "Project Report"){
      tasks.forEach(t => {
        if(t.priorization === "Pending"){
          charData[0] += 1;
        }
        else if(t.priorization === "In progress"){
          charData[1] += 1;
        }
        else if(t.priorization === "Testing"){
          charData[2] += 1;
        }
        else if(t.priorization === "Completed"){
          charData[3] += 1;
        }
      });
    }
    return charData;
  }

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h2>{graphType}</h2>
          <PopperHelp content={"This is a description about the chart."}/>
        </div>
        <div className={styles.graph}>

          {graphType ?
            graphType === "Tasks Priorization Chart" ?

              <Bar className={styles.chart}
                data = {{
                  labels: ["Easy Win", "Strategic Initiatives", "Worth Persuing Later", "Deprioritize"],
                  datasets: [{
                    axis: 'y',
                    label: 'Story Points',
                    data: graphData.byStoryPoints,
                    fill: false,
                    backgroundColor: ['#A12464'],
                    borderColor: ['#A12464'],
                    borderWidth: 1
                  },
                  {
                    axis: 'y',
                    label: 'Tasks',
                    data: graphData.byTasks,
                    fill: false,
                    backgroundColor: ['#7BEFFF'],
                    borderColor: ['#7BEFFF'],
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
            : graphType === "Project Report" ?
              <Bar className={styles.chart}
                data = {{
                  labels: ["Pending", "In progress", "Testing", "Completed"],
                  datasets: [{
                    axis: 'y',
                    label: 'Story Points',
                    data: graphData.byStoryPoints,
                    fill: false,
                    backgroundColor: ['#A12464'],
                    borderColor: ['#A12464'],
                    borderWidth: 1
                  },
                  {
                    axis: 'y',
                    label: 'Tasks',
                    data: graphData.byTasks,
                    fill: false,
                    backgroundColor: ['#7BEFFF'],
                    borderColor: ['#7BEFFF'],
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
            : graphType === "Sprint Report" ?
            <Bar className={styles.chart}
              data = {{
                labels: ["Pending", "In progress", "Testing", "Completed"],
                datasets: [{
                  axis: 'y',
                  label: 'Story Points',
                  data: [412, 550, 322, 478],
                  fill: false,
                  backgroundColor: ['#A12464'],
                  borderColor: ['#A12464'],
                  borderWidth: 1
                },
                {
                  axis: 'y',
                  label: 'Tasks',
                  data: [10, 5, 6, 8],
                  fill: false,
                  backgroundColor: ['#7BEFFF'],
                  borderColor: ['#7BEFFF'],
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
              }}
            }/>
            :
            <>
          </>
          :
          <>
          </>
          }
        </div>
        <div className={styles.description}>
        </div>
      </div>
    </div>
  );
}
