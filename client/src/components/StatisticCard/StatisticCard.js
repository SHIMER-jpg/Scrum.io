/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";

// componentes
import PopperHelp from "../PopperHelp/PopperHelp.js";

// componentes charts de chartjs
import { Bar, Line } from "react-chartjs-2";

import styles from "./StatisticCard.module.css";

import moment from 'moment';
moment().format();

export default function StatisticCard({graphType, tasks, project}) {
  const [graphData, setGraphData] = useState({
    byStoryPoints: [],
    byTasks: [],
  });

  // estado y funcion para cambiar la vista de los datos entre ver por story point o por tareas
  const [charDataOption, setCharDataOption] = useState({
    dataBy: "byStoryPoints",
    projectOrSprint: "byProject",
    sprintNumber: 1,
  });

  function handleDataChartOption(e){
    if(e.target.name === "sprintNumber" && (e.target.value < 1 || e.target.value === "")){
      e.target.value = charDataOption.sprintNumber;
    }
    else{
      setCharDataOption({
        ...charDataOption,
        [e.target.name]:e.target.value,
      });
    }
  }

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
  for(let i=1; i <= days; i++){
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
  dataStoryPoints = dataStoryPoints.reverse()

  let completedTasks = tasks && tasks.filter(t=> t.status === 'Completed').sort(function(a, b) {
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
  for(let h=1; h < devStoryPoints.length; h++){
    devStoryPoints[h] = 0
  }

  for(let i=0; i <= completedDates.length; i++){
    for(let j=0; j < completedTasks.length; j++){
      if(completedTasks[j].completedDate === completedDates[i]){
        devStoryPoints[i+1] = dataStoryPoints[i] - completedTasks[j].storyPoints
      }
    }
  }

  let tasksPerDay= Math.round(tasks.length/days)
  let dataTasksPerDay = []
  let add = 0
  for(let i=0; i <= days; i++){
    dataTasksPerDay[i] = add;
    add = add + tasksPerDay;
  }
  dataTasksPerDay = dataTasksPerDay.reverse()

  let tasksCompletedPerDay = []
  for(let h=1; h < devStoryPoints.length; h++){
    tasksCompletedPerDay[h] = 0
  }
  for(let i=0; i <= completedDates.length; i++){
    for(let j=0; j < completedTasks.length; j++){
      if(completedTasks[j].completedDate === completedDates[i]){
        tasksCompletedPerDay[i] = dataTasksPerDay[i] - 1
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
        if(t.status === "Pending"){
          charData[0] += t.storyPoints;
        }
        else if(t.status === "In progress"){
          charData[1] += t.storyPoints;
        }
        else if(t.status === "Testing"){
          charData[2] += t.storyPoints;
        }
        else if(t.status === "Completed"){
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
        if(t.status === "Pending"){
          charData[0] += 1;
        }
        else if(t.status === "In progress"){
          charData[1] += 1;
        }
        else if(t.status === "Testing"){
          charData[2] += 1;
        }
        else if(t.status === "Completed"){
          charData[3] += 1;
        }
      });
    }
    return charData;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h2>{graphType}</h2>
          <PopperHelp content={"This is a description about the chart."}/>
        </div>
        <div className={styles.graph}>

          {graphType ?
            graphType === "Tasks Priorization Chart" ?

              <Bar
                data = {{
                  labels: ["Easy Win", "Strategic Initiatives", "Worth Persuing Later", "Deprioritize"],
                  datasets: [{
                    axis: 'y',
                    label: 'Tasks Priorization Chart',
                    data: graphData[charDataOption.dataBy],
                    fill: false,
                    backgroundColor: [
                      '#8eff7b',
                      '#7befff',
                      '#ffa53c',
                      '#ff6868',
                    ],
                    borderColor: [
                      '#8eff7b',
                      '#7befff',
                      '#ffa53c',
                      '#ff6868',
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
            : graphType === "Project Report" ?
              <Bar
                data = {{
                  labels: ["Pending", "In progress", "Testing", "Completed"],
                  datasets: [{
                    axis: 'y',
                    label: 'Project Report',
                    data: graphData[charDataOption.dataBy],
                    fill: false,
                    backgroundColor: [
                      '#ff6868',
                      '#7befff',
                      '#ffa53c',
                      '#8eff7b',
                    ],
                    borderColor: [
                      '#ff6868',
                      '#7befff',
                      '#ffa53c',
                      '#8eff7b',
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
            : graphType === "Sprint Report" ?
            <Bar
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
            <Line
            data={{
              labels: dataDays,
              datasets:[
              {
                label: 'Actual development',
                data: charDataOption === 'byStoryPoints' ? devStoryPoints : tasksCompletedPerDay,
                borderColor:['#a12464']
              },
              {
                label: 'Ideal development',
                data: charDataOption === 'byStoryPoints' ? dataStoryPoints : dataTasksPerDay,
                borderColor:['#7BEFFF']
              },
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
        <div className={styles.footer}>
          <select onChange={(e) => handleDataChartOption(e)} name="dataBy">
            <option value="byStoryPoints">Story Points</option>
            <option value="byTasks">Tasks</option>
          </select>
          <select onChange={(e) => handleDataChartOption(e)} name="projectOrSprint">
            <option value="byProject">Project</option>
            <option value="bySprint">Sprint</option>
          </select>
          {charDataOption.projectOrSprint === "bySprint" &&
            <input type="number" min="1" onChange={(e) => handleDataChartOption(e)} name="sprintNumber" value={charDataOption.sprintNumber} />
          }
        </div>
      </div>
    </div>
  );
}
