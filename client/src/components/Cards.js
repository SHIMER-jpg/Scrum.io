import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "./Card";
import testingTask from "../Testing";

import styles from "../styles/Card.module.css";

function Cards() {
  const { logout } = useAuth0();

  return (
    <div style={{ height: "100px" }}>
      <div className={styles.grid}>
        <Card
          elements={testingTask.filter((e) => e.task === "Stories")}
          name={"Stories"}
        />
        <Card
          elements={testingTask.filter((e) => e.task === "ToDo")}
          name={"To Dos"}
        />
        <Card
          elements={testingTask.filter((e) => e.task === "in Progress")}
          name={"In Progress"}
        />
        <Card
          elements={testingTask.filter((e) => e.task === "Testing")}
          name={"Testing"}
        />
        <Card
          elements={testingTask.filter((e) => e.task === "Done")}
          name={"Done"}
        />
      </div>
      <button onClick={logout}>Logout!</button>
    </div>
  );
}

export default Cards;
