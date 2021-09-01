import Header from "./Header";
import { Card } from "./Card";
import testingTask from "../Testing";

import styles from "../styles/Card.module.css";

function Cards() {
  return (
    <>
      <Header />
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
      </div>
    </>
  );
}

export default Cards;
