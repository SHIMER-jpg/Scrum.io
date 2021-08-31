import styles from "../styles/managementView.modules.css";

import TaskHolder from "../components/tasksHolder/tasksHolder";

export default function managementView() {
  return (
    <div className={styles.container}>
      <h2>Home</h2>
      <div className={styles.hairline}></div>
      <TaskHolder />
    </div>
  );
}
