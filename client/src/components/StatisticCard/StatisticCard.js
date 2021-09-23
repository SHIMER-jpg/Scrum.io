/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";

// componentes
import PopperHelp from "../PopperHelp/PopperHelp.js";

// componentes charts de chartjs
import { Chart, Pie, Line, Bar } from "react-chartjs-2";

import annotationPlugin from "chartjs-plugin-annotation";

import styles from "./StatisticCard.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
moment().format();
Chart.register(annotationPlugin);

export default function StatisticCard({ graphType, tasks, project }) {
  const [graphData, setGraphData] = useState({
    byStoryPoints: [],
    byTasks: [],
  });

  const isDarkMode = useSelector((state) => state.app.darkMode);

  // estado y funcion para cambiar la vista de los datos entre ver por story point o por tareas
  const [charDataOption, setCharDataOption] = useState({
    dataBy: "byStoryPoints",
    projectOrSprint: "byProject",
    sprintNumber: 1,
  });

  const [labelDays, setLabelDays] = useState([]);

  function getSprintLine() {
    const firstDay = project.startDate
      ? project.startDate && moment(project.startDate.substring(0, 10))
      : project.creationDate && moment(project.creationDate.substring(0, 10));
    const sprintLineArray = project.sprintEndDates.map((date, index) => {
      const dateToMoment = moment(date.substring(0, 10));
      const value = dateToMoment.diff(firstDay, "days");
      const line = {
        type: "line",
        xMin: value,
        xMax: value,
        borderColor: `${isDarkMode ? "#e6697a" : "#cc001a"}`,
        borderWidth: 2,
        label: {
          enabled: true,
          content: "Sprint " + (index + 1),
          backgroundColor: "rgb(255,255,255,0)",
          color: `${isDarkMode ? "#e6697a" : "#cc001a"}`,
          position: "end",
          rotation: "270",
          xAdjust: -10,
        },
      };
      return line;
    });
    const annotations = {};
    sprintLineArray.forEach((line) => {
      annotations[`line${line.xMax}`] = line;
    });
    return annotations;
  }

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

  // se encarga de setear los datos de los graficos
  useEffect(() => {
    if (tasks.length > 0) {
      setGraphData({
        ...graphData,
        byStoryPoints: charDataByStoryPoints(),
        byTasks: charDataByTasks(),
      });
    }
  }, [tasks, charDataOption.sprintNumber]);

  useEffect(() => {
    let firstDay = project.startDate
      ? project.startDate && moment(project.startDate.substring(0, 10))
      : project.creationDate && moment(project.creationDate.substring(0, 10));
    let lastDay =
      project.requiredDate && moment(project.requiredDate.substring(0, 10));
    let days = firstDay && lastDay.diff(firstDay, "days");
    let dataDays = [];
    for (let i = 0; i <= days; i++) {
      dataDays[i] = i;
    }
    setLabelDays(dataDays);
  }, []);

  //CALCULATIONS FOR IDEAL PROGRESS
  function idealProgress() {
    if (tasks.length > 0) {
      var storyPoints = tasks.map((t) => t.storyPoints).reduce((a, b) => a + b);
      storyPoints = parseInt(storyPoints, 10);
      var storyPointsPerDay = parseFloat(
        (storyPoints / labelDays.length).toFixed(2)
      );
      let sum = 0;
      var dataStoryPoints = [];
      for (let i = 0; i <= labelDays.length; i++) {
        dataStoryPoints[i] = Math.round(sum);
        sum = sum + storyPointsPerDay;
      }
      dataStoryPoints = dataStoryPoints.reverse();

      return dataStoryPoints;
    }
  }

  function burnDownProgress() {
    //CALCULATIONS FOR ACTUAL PROGRESS
    let firstDay =
      project.creationDate && moment(project.creationDate.substring(0, 10));
    let completedTasks = tasks
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
    if (completedTasks.length < 1) return [];
    var lastCompletedDate = moment(
      completedTasks[completedTasks.length - 1].completedDate?.substring(0, 10)
    );
    var finalDate = lastCompletedDate.diff(firstDay, "days");

    completedTasks.map((task) => {
      const completedDate = moment(task.completedDate?.substring(0, 10));
      task.daysFromStart = completedDate.diff(firstDay, "days");
      return task;
    });

    var devStoryPoints = new Array(finalDate + 1);
    devStoryPoints.fill(idealProgress()[0]);
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
    const filteredTasks =
      charDataOption.projectOrSprint === "bySprint"
        ? tasks.filter((t) => t.sprintId == charDataOption.sprintNumber)
        : tasks;
    if (graphType === "Tasks Priorization Chart") {
      filteredTasks.forEach((t) => {
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
      filteredTasks.forEach((t) => {
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
    const filteredTasks =
      charDataOption.projectOrSprint === "bySprint"
        ? tasks.filter((t) => t.sprintId == charDataOption.sprintNumber)
        : tasks;
    if (graphType === "Tasks Priorization Chart") {
      filteredTasks.forEach((t) => {
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
      filteredTasks.forEach((t) => {
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
                      data: idealProgress(),
                      // data: charDataOption === 'byStoryPoints' ? dataStoryPoints : dataTasksPerDay,
                      backgroundColor: ["#7BEFFF"],
                      borderColor: ["#7BEFFF"],
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
                  plugins: {
                    annotation: {
                      drawTime: "afterDatasetsDraw",
                      annotations: getSprintLine(),
                      // {
                      //   line1: {
                      //     type: "line",
                      //     xMax: 10,
                      //     xMin: 10,
                      //     borderColor: "rgb(255, 99, 132)",
                      //     borderWidth: 2,
                      //   },
                      // },
                    },
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
        {graphType !== "BurnDown Chart" ? (
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
                min={1}
                max={project.sprintCount}
                onChange={(e) => handleDataChartOption(e)}
                name="sprintNumber"
                value={charDataOption.sprintNumber}
              />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

// annotation: {
//   annotations: [
//     {
//       type: "line",
//       mode: "horizontal",
//       // scaleID: "y-axis-1",
//       value: 129,
//       borderColor: "black",
//       borderWidth: 10,
//       label: {
//         backgroundColor: "red",
//         content: "Test Label",
//         enabled: true,
//       },
//     },
//   ],
// },
