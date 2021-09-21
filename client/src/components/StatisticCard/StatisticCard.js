/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";

// componentes
import PopperHelp from "../PopperHelp/PopperHelp.js";

// componentes charts de chartjs
import { Pie, Line, Bar } from "react-chartjs-2";

import styles from "./StatisticCard.module.css";

import moment from "moment";
moment().format();

export default function StatisticCard({ graphType, tasks, project }) {

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

  const [labelDays, setLabelDays] = useState([]);
  const [idealProgress, setIdealProgress] = useState([]);
  const [renderedTasks, setRenderedTasks] = useState(tasks);

  function handleDataChartOption(e) {
    if (
      e.target.name === "sprintNumber" &&
      (e.target.value < 1 || e.target.value === "")
    ) {
      e.target.value = charDataOption.sprintNumber;
    } else {
      setCharDataOption({
        ...charDataOption,
        [e.target.name]: e.target.value,
      });
    }
  }

  // function getLabels() {
  //   let firstDay =
  //     project.creationDate && moment(project.creationDate.substring(0, 10));
  //   let lastDay =
  //     project.requiredDate && moment(project.requiredDate.substring(0, 10));
  //   if(charDataOption.projectOrSprint === "bySprint"){
  //     firstDay.add((project.sprintDuration * 7) * (charDataOption.sprintNumber - 1), "days");
  //     lastDay.subtract((project.sprintDuration * 7) * (project.sprintCount - charDataOption.sprintNumber) - 3, "days");
  //   }
  //   let days = firstDay && lastDay.diff(firstDay, "days");
  //   let dataDays = [];
  //   for (let i = 1; i <= days; i++) {
  //     dataDays[i-1] = i;
  //   }
  //   return dataDays;
  // }

  useEffect(() => {
    let firstDay =
      project.creationDate && moment(project.creationDate.substring(0, 10));
    let lastDay =
      project.requiredDate && moment(project.requiredDate.substring(0, 10));
    if(charDataOption.projectOrSprint === "bySprint"){
      firstDay.add((project.sprintDuration * 7) * (charDataOption.sprintNumber - 1), "days");
      lastDay.subtract((project.sprintDuration * 7) * (project.sprintCount - charDataOption.sprintNumber) - 3, "days");
    }
    let days = firstDay && lastDay.diff(firstDay, "days");
    let dataDays = [];
    for (let i = 1; i <= days; i++) {
      dataDays[i-1] = i;
    }
    setLabelDays(dataDays);
    console.log(labelDays, "labels")

    var auxProgress = getIdealProgress();
    setIdealProgress(auxProgress);
    console.log(idealProgress, "ideal progress");
    console.log("holaaa")
  }, [])

  //filters tasks by selected sprint id
  useEffect(() => {

    //calculates labels (x axis)
    let firstDay =
      project.creationDate && moment(project.creationDate.substring(0, 10));
    let lastDay =
      project.requiredDate && moment(project.requiredDate.substring(0, 10));
    if(charDataOption.projectOrSprint === "bySprint"){
      firstDay.add((project.sprintDuration * 7) * (charDataOption.sprintNumber - 1), "days");
      lastDay.subtract((project.sprintDuration * 7) * (project.sprintCount - charDataOption.sprintNumber) - 3, "days");
    }
    let days = firstDay && lastDay.diff(firstDay, "days");
    let dataDays = [];
    for (let i = 1; i <= days; i++) {
      dataDays[i-1] = i;
    }
    setLabelDays(dataDays);

    //filters tasks to be rendered
    var auxTasks = tasks;
    if(charDataOption.projectOrSprint === "bySprint"){
      auxTasks = tasks.filter((task) => task.sprintId === charDataOption.sprintNumber);
      setRenderedTasks(auxTasks);
      console.log(renderedTasks, "rend tasks")
    }
    if(charDataOption.projectOrSprint === "byProject"){
      setRenderedTasks(tasks);
    }

    //calculates ideal Progress graph
    var auxProgress = getIdealProgress();
    setIdealProgress(auxProgress);
    console.log(idealProgress, "ideal progress");
    console.log("holaaa")

  }, [charDataOption])

  //sets graph data when filteres tasks change
  useEffect(() => {
    if (renderedTasks.length > 0) {
      setGraphData({
        ...graphData,
        byStoryPoints: charDataByStoryPoints(),
        byTasks: charDataByTasks(),
      });
      console.log(graphData, "graph");
    }
  }, [renderedTasks]);

  //CALCULATIONS FOR IDEAL PROGRESS
  function getIdealProgress() {
    if (renderedTasks.length > 0) {
      var storyPoints = renderedTasks.map((t) => t.storyPoints).reduce((a, b) => a + b);
      storyPoints = parseInt(storyPoints, 10);
      var storyPointsPerDay = parseFloat(
        (storyPoints / labelDays.length).toFixed(2)
      );
      let sum = 0;
      var dataStoryPoints = [];
      for (let i = 0; i < labelDays.length; i++) {
        dataStoryPoints[i] = Math.round(sum);
        sum = sum + storyPointsPerDay;
      }
      dataStoryPoints = dataStoryPoints.reverse();
      console.log(dataStoryPoints, "ideal function")
      return dataStoryPoints;
    }
  }

  function burnDownProgress() {
    //CALCULATIONS FOR ACTUAL PROGRESS
    let firstDay =
      project.creationDate && moment(project.creationDate.substring(0, 10));
    console.log(project);
    if(charDataOption.projectOrSprint === "bySprint"){
      firstDay.add((project.sprintDuration * 7) * (charDataOption.sprintNumber - 1), "days");
    }
    let completedTasks = renderedTasks
      .filter((t) => t.status === "Completed")
      .sort(function (a, b) {
        if (a.completedDate > b.completedDate) {
          return 1;
        }
        if (a.completedDate < b.completedDate) {
          return -1;
        }
        return 0;
      });
    var lastCompletedDate = moment(
      completedTasks[completedTasks.length - 1].completedDate.substring(0, 10)
    );
    var finalDate = lastCompletedDate.diff(firstDay, "days");

    completedTasks.map((task) => {
      const completedDate = moment(task.completedDate?.substring(0, 10));
      task.daysFromStart = completedDate.diff(firstDay, "days");
      return task;
    });

    var devStoryPoints = new Array(finalDate + 1);
    console.log(idealProgress[0], "fill con cero");
    devStoryPoints.fill(getIdealProgress()[0]);

    var devStoryPointsCorrected = [];
    devStoryPoints.forEach((point, index) => {
      if (index === 0) {
        devStoryPointsCorrected.push(devStoryPoints[index]);
        return;
      }
      const minus = completedTasks.reduce((acc, val) => {
        if (val.daysFromStart === index) {
          return acc + parseInt(val.storyPoints);
        } else {
          return acc + 0;
        }
      }, 0);
      if (minus === 0) {
        devStoryPointsCorrected.push(devStoryPointsCorrected[index - 1]);
        return;
      } else {
        return devStoryPointsCorrected.push(
          devStoryPointsCorrected[index - 1] - minus
        );
      }
    });
    return devStoryPointsCorrected;
    // for (let i = 0; i <= completedDates.length; i++) {
    //   for (let j = 0; j < completedTasks.length; j++) {
    //     if (completedTasks[j].completedDate === completedDates[i]) {

    //       devStoryPoints[i + 1] =
    //         dataStoryPoints[i] - completedTasks[j].storyPoints;
    //     }
    //   }
    // }
    // console.log(devStoryPoints, dataStoryPoints);

    // let tasksPerDay = Math.round(tasks.length / days);
    // let dataTasksPerDay = [];
    // let add = 0;
    // for (let i = 0; i <= days; i++) {
    //   dataTasksPerDay[i] = add;
    //   add = add + tasksPerDay;
    // }
    // dataTasksPerDay = dataTasksPerDay.reverse();

    // let tasksCompletedPerDay = [];
    // for (let h = 1; h < devStoryPoints.length; h++) {
    //   tasksCompletedPerDay[h] = 0;
    // }
    // for (let i = 0; i <= completedDates.length; i++) {
    //   for (let j = 0; j < completedTasks.length; j++) {
    //     if (completedTasks[j].completedDate === completedDates[i]) {
    //       tasksCompletedPerDay[i] = dataTasksPerDay[i] - 1;
    //     }
    //   }
    // }
  }
  // funcion para setear la data por StoryPoints
  function charDataByStoryPoints() {
    var charData = [0, 0, 0, 0];
    if (graphType === "Tasks Priorization Chart") {
      renderedTasks.forEach((t) => {
        if (t.priorization === "Easy Win") {
          charData[0] += t.storyPoints;
        } else if (t.priorization === "Strategic Initiative") {
          charData[1] += t.storyPoints;
        } else if (t.priorization === "Worth Pursuing") {
          charData[2] += t.storyPoints;
        } else if (t.priorization === "Deprioritize") {
          charData[3] += t.storyPoints;
        }
      });
    } else if (graphType === "Project Report") {
      renderedTasks.forEach((t) => {
        if (t.status === "Pending") {
          charData[0] += t.storyPoints;
        } else if (t.status === "In progress") {
          charData[1] += t.storyPoints;
        } else if (t.status === "Testing") {
          charData[2] += t.storyPoints;
        } else if (t.status === "Completed") {
          charData[3] += t.storyPoints;
        }
      });
    } else if (graphType === "BurnDown Chart") charData = burnDownProgress();
    return charData;
  }

  // funcion para setear la data por tasks
  function charDataByTasks() {
    var charData = [0, 0, 0, 0];
    if (graphType === "Tasks Priorization Chart") {
      renderedTasks.forEach((t) => {
        if (t.priorization === "Easy Win") {
          charData[0] += 1;
        } else if (t.priorization === "Strategic Initiative") {
          charData[1] += 1;
        } else if (t.priorization === "Worth Pursuing") {
          charData[2] += 1;
        } else if (t.priorization === "Deprioritize") {
          charData[3] += 1;
        }
      });
    } else if (graphType === "Project Report") {
      renderedTasks.forEach((t) => {
        if (t.status === "Pending") {
          charData[0] += 1;
        } else if (t.status === "In progress") {
          charData[1] += 1;
        } else if (t.status === "Testing") {
          charData[2] += 1;
        } else if (t.status === "Completed") {
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
          <PopperHelp content={"This is a description about the chart."} />
        </div>
        <div className={styles.graph}>
          {graphType ? (
            graphType === "Tasks Priorization Chart" ? (
              <Pie
                data={{
                  labels: [
                    "Easy Win",
                    "Strategic Initiatives",
                    "Worth Persuing Later",
                    "Deprioritize",
                  ],
                  datasets: [
                    {
                      axis: "y",
                      label: "Tasks Priorization Chart",
                      data: graphData[charDataOption.dataBy],
                      fill: false,
                      backgroundColor: [
                        "#8eff7b",
                        "#7befff",
                        "#ffa53c",
                        "#ff6868",
                      ],
                      borderColor: ["#8eff7b", "#7befff", "#ffa53c", "#ff6868"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      display: false,
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : graphType === "Project Report" ? (
              <Bar
                data={{
                  labels: ["Pending", "In progress", "Testing", "Completed"],
                  datasets: [
                    {
                      axis: "y",
                      label: "Project Report",
                      data: graphData[charDataOption.dataBy],
                      fill: false,
                      backgroundColor: [
                        "#ff6868",
                        "#7befff",
                        "#ffa53c",
                        "#8eff7b",
                      ],
                      borderColor: ["#ff6868", "#7befff", "#ffa53c", "#8eff7b"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : graphType === "BurnDown Chart" ? (
              <Line
                data={{
                  labels: labelDays,
                  datasets: [
                    {
                      label: "Actual development",
                      // data: devStoryPointsCorrected,
                      data: graphData.byStoryPoints,
                      // data: charDataOption === 'byStoryPoints' ? devStoryPoints : tasksCompletedPerDay,
                      backgroundColor: ["#a12464"],
                      borderColor: ["#a12464"],
                    },
                    {
                      label: "Ideal development",
                      data: idealProgress,
                      // data: charDataOption === 'byStoryPoints' ? dataStoryPoints : dataTasksPerDay,
                      backgroundColor: ["#7BEFFF"],
                      borderColor: ["#7BEFFF"],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    autocolors: false,
                      annotation: {
                        annotations: {
                          line1: {
                            type: 'line',
                            xMin: 0,
                            xMax: 5,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                          }
                        }
                      }
                  },
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      beginAtZero: false,
                    }
                  },
                }}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
          <div className={styles.footer}>
            <select onChange={(e) => handleDataChartOption(e)} name="dataBy">
              <option value="byStoryPoints">Story Points</option>
              <option value="byTasks">Tasks</option>
            </select>
            <select
              onChange={(e) => handleDataChartOption(e)}
              name="projectOrSprint"
            >
              <option value="byProject">Project</option>
              <option value="bySprint">Sprint</option>
            </select>
            {charDataOption.projectOrSprint === "bySprint" && (
              <input
                type="number"
                min="1"
                max={project.sprintCount}
                onChange={(e) => handleDataChartOption(e)}
                name="sprintNumber"
                value={charDataOption.sprintNumber}
              />
            )}
          </div>
      </div>
    </div>
  );
}
