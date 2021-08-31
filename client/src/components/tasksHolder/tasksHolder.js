import { useAuth0 } from "@auth0/auth0-react";
import { Task } from "./task";
import testingTask from "./Testing";

import styles from "../../styles/tasksHolder.module.css";

export default function TasksHolder() {
  const { logout } = useAuth0();

  return (
    <div style={{ height: "100px" }}>
      <div className={styles.grid}>
        <Task
          elements={testingTask.filter((e) => e.task === "Stories")}
          name={"Stories"}
        />
        <Task
          elements={testingTask.filter((e) => e.task === "ToDo")}
          name={"To Dos"}
        />
        <Task
          elements={testingTask.filter((e) => e.task === "in Progress")}
          name={"In Progress"}
        />
        <Task
          elements={testingTask.filter((e) => e.task === "Testing")}
          name={"Testing"}
        />
        <Task
          elements={testingTask.filter((e) => e.task === "Done")}
          name={"Done"}
        />
      </div>
      <button onClick={logout}>Logout!</button>
    </div>
  );
}
