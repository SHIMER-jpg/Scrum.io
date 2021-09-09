/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";

import { BsQuestionCircle } from 'react-icons/bs';

// componentes charts de chartjs
import { Bar } from "react-chartjs-2";
import {Line} from 'react-chartjs-2';

import styles from "./StatisticCard.module.css";

export default function StatisticCard({graphType, tasks, project}) {
  const [graphData, setGraphData] = useState({
    byStoryPoints: [],
    byTasks: [],
  })

  if(tasks.length > 0) {
    var storyPoints = tasks.map(t => t.storyPoints).reduce((a,b) => a + b)
  }

  useEffect(() => {
    if(tasks.length > 0){
      setGraphData({
        ...graphData,
        byStoryPoints: charDataByStoryPoints(),
        byTasks: charDataByTasks(),
      })
    }
  },[tasks])

  // funcion para setear la data por StoryPoints
  function charDataByStoryPoints(){
    if(graphType === "Tasks Priorization Chart"){
      return[
        tasks.filter(t => t.priorization === "Easy Win").map(t => t.storyPoints).reduce((points, a) => points +a),
        tasks.filter(t => t.priorization === "Strategic Initiative").map(t => t.storyPoints).reduce((points, a) => points + a),
        tasks.filter(t => t.priorization === "Worth Pursuing").map(t => t.storyPoints).reduce((points, a) => points + a),
        tasks.filter(t => t.priorization === "Deprioritize").map(t => t.storyPoints).reduce((points, a) => points + a),
      ]
    }
    else if(graphType === "Project Report"){
      return[
        tasks.filter(t => t.status === "Pending").map(t => t.storyPoints).reduce((points, a) => points + a),
        tasks.filter(t => t.status === "In progress").map(t => t.storyPoints).reduce((points, a) => points + a),
        tasks.filter(t => t.status === "Testing").map(t => t.storyPoints).reduce((points, a) => points + a),
        tasks.filter(t => t.status === "Completed").map(t => t.storyPoints).reduce((points, a) => points + a),
      ]
    }
  }
  // funcion para setear la data por tasks
  function charDataByTasks(){
    if(graphType === "Tasks Priorization Chart"){
      return [
        tasks.filter(t => t.priorization === "Easy Win").length,
        tasks.filter(t => t.priorization === "Strategic Initiative").length,
        tasks.filter(t => t.priorization === "Worth Pursuing").length,
        tasks.filter(t => t.priorization === "Deprioritize").length,
      ]
    }
    else if(graphType === "Project Report"){
      return[
        tasks.filter(t => t.status === "Pending").length,
        tasks.filter(t => t.status === "In progress").length,
        tasks.filter(t => t.status === "Testing").length,
        tasks.filter(t => t.status === "Completed").length,
      ]
    }
  }

  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h2>{graphType} <BsQuestionCircle className={styles.help} size={20}/></h2>
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
          :
            graphType === "BurnDown Chart" ?
              <Line className={styles.chart}
              data={{
                labels: ['0','1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                {
                  label: 'Actual development',
                  data: [21, 16, 12, 9, 7, 5, 2, 0],
                  borderColor:['#a12464']
                },
                {
                  label: 'Ideal development',
                  data: [21,18,15,12,9,6,3,0],
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
