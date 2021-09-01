import Header from "../../components/Header/Header";
import Tasks from "../../components/Tasks/Task";
import testingTask from "./mockupData";
import styles from "./ManagerView.module.css";

export default function ManagerView() {
  return (
    <>
      <Header />
      <div style={{ height: "100px" }}>
        <div className={styles.grid}>
          <Tasks
            elements={testingTask.filter((e) => e.task === "Stories")}
            name={"Stories"}
          />
          <Tasks
            elements={testingTask.filter((e) => e.task === "ToDo")}
            name={"To Dos"}
          />
          <Tasks
            elements={testingTask.filter((e) => e.task === "in Progress")}
            name={"In Progress"}
          />
          <Tasks
            elements={testingTask.filter((e) => e.task === "Testing")}
            name={"Testing"}
          />
          <Tasks
            elements={testingTask.filter((e) => e.task === "Done")}
            name={"Done"}
          />
        </div>
      </div>
    </>
  );
}
