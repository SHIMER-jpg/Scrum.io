import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import  { Bar, Line } from 'react-chartjs-2';
import styles from "./StatisticDeveloper.module.css";

import { useSearch } from "../../hooks/useSearch";

export default function StatisticDeveloper(props) {
  const users = useSelector((state) => state.managerView.asignedUsers);
  const tasks = useSelector((state) => state.managerView.tasks);
  const userTasks = tasks.filter((t) => t.asignedTo === "61377a66c16ac40924f9daa0");
  const completedUserTasks = userTasks.filter((t) => t.completedDate);
  const labels = getLabels();
  const userData = getData(getDate("2021-09-25T00:00:00.000Z"), getDate("2021-09-17T00:00:00.000Z"), completedUserTasks);
  console.log(userData);

  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  console.log(users, "users");
  // const [query, setQuery, filteredUsers] = useSearch(users);

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
  console.log(users, "users");
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
            .filter((user) => selectedUsers.includs(user._id))
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
