import logo from "./logo.svg";
import "./App.css";
import { Stories } from "./components/Stories";
import testingTask from "./Testing";
import { ToDo } from "./components/ToDo";
import { Done } from "./components/Done";
import { InProgress } from "./components/InProgress";
import { Testing } from "./components/Testing";

console.log(testingTask);

function App() {
  return (
    <div>
      <Stories element={testingTask} />
      <InProgress element={testingTask} />
      <ToDo element={testingTask} />
      <Testing element={testingTask} />
      <Done element={testingTask} />
    </div>
  );
}

export default App;
