import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import moment from "moment";
import styles from "./StatisticDeveloper.module.css";

// components
import PopperHelp from "../PopperHelp/PopperHelp.js";
import { FaUserCircle } from "react-icons/fa";

import { useSearch } from "../../hooks/useSearch";

export default function StatisticDeveloper(props) {
  //---STATES----------------------------------------
  const project = useSelector((state) => state.managerView.project);
  const users = useSelector((state) => state.managerView.asignedUsers);
  const tasks = useSelector((state) => state.managerView.tasks);

  const [user, setUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [view, setView] = useState("days");
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);

  const userTasks = tasks.filter((t) => t.asignedTo === user._id);
  const completedUserTasks = userTasks.filter((t) => t.status === "Completed");
  const userData = getData(
    project.creationDate,
    moment(),
    completedUserTasks,
    view
  );
  const labels = getLabels(project.requiredDate, project.creationDate, view);

  const [query, setQuery, filteredUsers] = useSearch(selectedUsers);

  function calculateDays(required, created, view) {
    //dinamically calculates the difference between two periods of time
    let finalDate = moment(required);
    let initialDate = moment(created);
    return finalDate.diff(initialDate, view);
  }

  function getLabels(finalDate, initialDate, view) {
    //creates an array with the calculated values to be set as labels
    var days = calculateDays(finalDate, initialDate, view);
    var labelArray = [];
    for (let i = 0; i <= days; i++) {
      labelArray.push(i + 1);
    }
    return labelArray;
  }

  function getData(initialDate, actualDate, tasks, view) {
    //creates a totalizer data object
    var period = calculateDays(actualDate, initialDate, view);
    var data = {
      quantity: [],
      storyPoints: [],
      average: { tasks: 0, sp: 0 },
      total: { tasks: 0, sp: 0, help: 0 },
    };
    for (let i = 0; i <= period; i++) {
      //initializing both arrays in 0 for each position
      data.quantity[i] = 0;
      data.storyPoints[i] = 0;
    }
    tasks.forEach(
      (
        t //iterating user tasks
      ) => {
        data.quantity[calculateDays(t.completedDate, initialDate, view)] += 1; //counts completed task quantity for each date
        data.storyPoints[calculateDays(t.completedDate, initialDate, view)] +=
          t.storyPoints; //counts completed story points for each date
        data.total.tasks += 1; //counts total amount of completed tasks
        data.total.sp += t.storyPoints; //counts total amount of story points
        if (t.helpNeeded) data.total.help += 1; //counts total amount of tasks with help needed
      }
    );
    data.average.tasks =
      Math.round((data.total.tasks / (period + 1) + Number.EPSILON) * 100) /
      100; //calculates average completed tasks in given time
    data.average.sp =
      Math.round((data.total.sp / (period + 1) + Number.EPSILON) * 100) / 100; //calculates average story points in given time
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

  function handleViewChange(view) {
    setView(view);
  }

  useEffect(() => {
    const filteredUsers = users
      // .filter(({ user }) => user._id !== loggedId)
      .map((u) => u.user);

    setSelectedUsers(filteredUsers);
  }, [users]);

  //-------RETURN-------------------------------------
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>Developer Statistics</h2>
            <PopperHelp
              content={"See a general overview of a developer's performance."}
            />
          </div>
          <div className={styles.options}>
            <div className={styles.modalFormGroup}>
              <div
                className={styles.userBox}
                onClick={() => {
                  setIsSelectUsersOpen(true);
                }}
              >
                {user.picture ? (
                  <img src={user.picture} alt="" />
                ) : (
                  <FaUserCircle size={30} />
                )}
                {user.name ? <p>{user.name}</p> : <p>Select user</p>}
              </div>
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
            <select
              className={styles.view}
              onChange={(e) => handleViewChange(e.target.value)}
            >
              <option value={"days"}>Daily</option>
              <option value={"weeks"}>Weekly</option>
              <option value={"months"}>Monthly</option>
            </select>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.graph}>
          <Bar
              className={styles.chart}
              data={{
                labels: labels,
                datasets: [
                  {
                    type: "bar",
                    label: "Completed Tasks",
                    yAxisID: 'Completed-Tasks',
                    borderColor: "#8eff7b",
                    borderWidth: 2,
                    backgroundColor: "#8eff7b",
                    data: userData.quantity,
                  },
                  {
                    type: "line",
                    label: "Story Points",
                    yAxisID: 'Story-Points',
                    backgroundColor: "#7befff",
                    data: userData.storyPoints,
                    borderColor: "#7befff",
                    borderWidth: 4,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  'Completed-Tasks': {
                    title:{
                      display: true,
                      text: 'Tasks',
                    },
                    type: 'linear',
                    position: 'right'
                  },
                  'Story-Points': {
                    title:{
                      display: true,
                      text: 'Story Points',
                    },
                    type: 'linear',
                    position: 'left'
                  },
                }
              }}
              height={100}
            />
          </div>

          <div className={styles.stats}>
            <div className={styles.modalFormGroup}>
              <div>
                <div className={styles.stat}>
                  <label>Tasks Completed</label>
                  <p>{userData.total.tasks ? userData.total.tasks : "-"}</p>
                </div>
                <div className={styles.stat}>
                  <label>Story Points Achieved</label>
                  <p>{userData.total.sp ? userData.total.sp : "-"}</p>
                </div>
                <div className={styles.stat}>
                  <label>Helped Tasks</label>
                  <p>{userData.total.help ? userData.total.help : "-"}</p>
                </div>
                <div className={styles.stat}>
                  <label>Average Task Completion</label>
                  <p>{userData.average.tasks ? userData.average.tasks : "-"}</p>
                </div>
                <div className={styles.stat}>
                  <label>Average Story Points</label>
                  <p>{userData.average.sp ? userData.average.sp : "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
