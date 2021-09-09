import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
import styles from "./StatisticDeveloper.module.css";

// componentes
import PopperHelp from "../PopperHelp/PopperHelp.js";

import { useSearch } from "../../hooks/useSearch";

export default function StatisticDeveloper(props) {
  //---STATES----------------------------------------
  const [view, setView] = useState("days");

  const project = useSelector((state) => state.managerView.project);
  const users = useSelector((state) => state.managerView.asignedUsers);
  const tasks = useSelector((state) => state.managerView.tasks);
  const [user, setUser] = useState({});
  console.log(project, "project");
  console.log(users, "users");
  // console.log(tasks, "tasks");

  const userTasks = tasks.filter((t) => t.asignedTo === user._id);
  console.log(userTasks, "userTasks");

  const completedUserTasks = userTasks.filter((t) => t.status === "Completed");
  console.log(completedUserTasks, "completed");

  const userData = getData(project.creationDate, moment(), completedUserTasks);
  console.log(userData, "userdata");

  const labels = getLabels(project.requiredDate, project.creationDate);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [data, setData] = useState([]);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);

  const [query, setQuery, filteredUsers] = useSearch(selectedUsers);

  function calculateDays(required, created) {
    //calculates x axis values dinamically (in days)
    let finalDate = moment(required);
    let initialDate = moment(created);
    return finalDate.diff(initialDate, "days");
  }

  function getLabels(finalDate, initialDate) {
    //creates an array with the calculated values to be set as labels
    var days = calculateDays(finalDate, initialDate);
    var labelArray = [];
    for (let i = 0; i < days; i++) {
      labelArray.push(i + 1);
    }
    return labelArray;
  }

  function getData(initialDate, actualDate, tasks) {
    //creates a totalizer data object
    var days = calculateDays(actualDate, initialDate);
    var data = {quantity: [], storyPoints: []};
    for(let i=0; i<=days; i++){ //initializing both arrays in 0 for each position
      data.quantity[i] = 0;
      data.storyPoints[i] = 0;
    }
    console.log(data.quantity, data.storyPoints, "data")
    tasks.forEach((t) =>    //mapping user tasks
      {
        console.log(calculateDays(t.completedDate, initialDate))
        data.quantity[calculateDays(t.completedDate, initialDate)] += 1   //counts completed task quantity
        data.storyPoints[calculateDays(t.completedDate, initialDate)] += t.storyPoints  //counts completed story points
      }
    );
    return data;
  }

  function handleAddUser(user) {
    // if (!selectedUsers.includes(user._id)) {
    //   setSelectedUsers({
    //     ...selectedUsers,
    //     selectedUsers: [...selectedUsers, user._id],
    //   });
    // }
    setUser(user);
    setIsSelectUsersOpen(false);
    setQuery("");
  }

  function handleRemoveUser(user) {
    setSelectedUsers({
      ...selectedUsers,
      selectedUsers: selectedUsers.filter((u) => u !== user._id),
    });
  }

  useEffect(() => {
    const filteredUsers = users
      // .filter(({ user }) => user._id !== loggedId)
      .map((u) => u.user);

    setSelectedUsers(filteredUsers);
  }, [users]);
  // console.log(filteredUsers, "filteredUsers");
  console.log("SHIMER", user, userTasks);
  //-------RETURN-------------------------------------
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h2>Developer Statistics</h2>
          <PopperHelp content={"This is a description about the chart."}/>
        </div>
        <div className={styles.graph}>
          <Bar
            className={styles.chart}
            data={{
              labels: labels,
              datasets: [
                {
                  type: "bar",
                  label: "Completed Tasks",
                  borderColor: "rgb(54, 162, 235)",
                  borderWidth: 2,
                  backgroundColor: "rgb(54, 162, 235)",
                  data: userData.quantity,
                },
                {
                  type: "line",
                  label: "Story Points",
                  backgroundColor: "rgb(255, 99, 132)",
                  data: userData.storyPoints,
                  borderColor: "rgb(255, 99, 132)",
                  borderWidth: 4,
                },
              ],
            }}
            option={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={100}
          />
        </div>

        <div className={styles.modalFormGroup}>
          <label className={styles.titles}>Selected User</label>
          {!isSelectUsersOpen && (
            <div
              className={styles.userBox}
              onClick={() => {
                setIsSelectUsersOpen(true);
              }}
            >
              <img src={user.picture} alt={user.name} />
              <p>{user.name}</p>
            </div>
          )}
          {isSelectUsersOpen && (
            <div
              className={`${styles.modalSelectUser} ${
                isSelectUsersOpen ? styles.visible : undefined
              }`}
            >
              <input
                onBlur={() => setIsSelectUsersOpen(false)}
                onFocus={() => setIsSelectUsersOpen(true)}
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={query}
                placeholder="Type a name..."
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
              />
              {filteredUsers.length ? (
                filteredUsers.map((user) => (
                  <article
                    onClick={() => handleAddUser(user)}
                    key={user._id}
                    className={styles.modalUser}
                  >
                    <img src={user.picture} alt={user.name} />
                    <p>{user.name}</p>
                  </article>
                ))
              ) : (
                <p>There's no user with that name :(</p>
              )}
            </div>
          )}
        </div>

        <div className={styles.description}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>
    </div>
  );
}
