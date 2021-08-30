import "./App.css";
import { Card } from "./components/Card";
import testingTask from "./Testing";

console.log(testingTask);

function Cards() {
  return (
    <div style={{ height: "100px" }}>
      <div className="Grid">
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
  );
}

export default Cards;
