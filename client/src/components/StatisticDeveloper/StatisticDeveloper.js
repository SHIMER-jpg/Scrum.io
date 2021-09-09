import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import  { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';
import styles from "./StatisticDeveloper.module.css";

import { useSearch } from "../../hooks/useSearch";

export default function StatisticDeveloper(props) {
  const project = useSelector((state) => state.managerView.project);
  const users = useSelector((state) => state.managerView.asignedUsers);
  const tasks = useSelector((state) => state.managerView.tasks);
  console.log(project, "project");
  console.log(users, "users");
  console.log(tasks, "tasks");

  const userTasks = tasks.filter((t) => t.asignedTo === "613274bb1a9c7e2b10cfe1c1");
  console.log(userTasks, "userTasks")

  const completedUserTasks = userTasks.filter((t) => t.status === "Completed");
  console.log(completedUserTasks, "completed")

  const userData = getData(project.creationDate, "2021-01-26T22:45:54.000Z", completedUserTasks);
  console.log(userData, "userdata");

  const labels = getLabels(project.requiredDate, project.creationDate);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [data, setData] = useState([]);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);

  // const [query, setQuery, filteredUsers] = useSearch(users);

  function calculateDays(required, created){        //calculates x axis values dinamically (in days)
    let finalDate = moment(required);
    let initialDate = moment(created);
    return finalDate.diff(initialDate, 'days');
  }

  function getLabels(finalDate, initialDate){           //creates an array with the calculated values to be set as labels
    var days = calculateDays(finalDate, initialDate);
    var labelArray = [];
    for(let i=0; i<days; i++){
      labelArray.push(i+1);
    }
    return labelArray;
  }

  function getData(initialDate, actualDate, tasks){  //creates a totalizer data object
    var days = calculateDays(actualDate, initialDate);
    var data = {quantity: [], storyPoints: []};
    for(let i=0; i<days; i++){ //initializing both arrays in 0 for each position
      data.quantity[i] = 0;
      data.storyPoints[i] = 0;
    }
    console.log(data.quantity, data.storyPoints, "weas")
    tasks.forEach((t) =>    //mapping user tasks
      {
        console.log(calculateDays(t.completedDate, initialDate))
        data.quantity[calculateDays(t.completedDate, initialDate)] += 1   //counts completed task quantity
        data.storyPoints[calculateDays(t.completedDate, initialDate)] += t.storyPoints  //counts completed story points
      }
    )
    return data;
  }

  function handleAddUser(user){
    if (!selectedUsers.includes(user._id)) {
      setSelectedUsers({
        ...selectedUsers,
        selectedUsers: [...selectedUsers, user._id]
      });
    }
    // setQuery("");
  }

  function handleRemoveUser(user){
    setSelectedUsers({
      ...selectedUsers,
      selectedUsers: selectedUsers.filter((u) => u !== user._id)
    })
  }
  // console.log(filteredUsers, "filteredUsers");
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

        <div>
          <input
            onBlur={() => setIsSelectUsersOpen(false)}
            onFocus={() => setIsSelectUsersOpen(true)}
            type="text"
            name="Users"
            /*value={query}*/
            autoComplete="off"
            /*onChange={(e) => setQuery(e.target.value)}*/
          />
        </div>
        <div
          className={`${styles.modalSelectUser} ${
            isSelectUsersOpen ? styles.visible : undefined
          }`}
        >
          {users.length ? (
            users.map((user) => (
              <article
                onClick={() => handleAddUser(user)}
                key={user._id}
                className={styles.modalUser}
              >
                <p>{user.name}</p>
              </article>
            ))
          ) : (
            <p>There's no user with that name :(</p>
          )}
        </div>
        <div className={styles.addedUsers}>
          {users
            .filter((user) => selectedUsers.includes(user._id))
            .map((user) => {
              <article key={user._id} className={styles.addedUsersCard}>
                <p>{user.name.split(" ")[0]}</p>
                <button onClick={() => handleRemoveUser(user)}>
                  x
                </button>
              </article>
            })
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
