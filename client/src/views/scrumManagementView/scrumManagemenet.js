import styles from "../scrumManagementView/scrumManagemenet.modules.css";

export default function scrumManagemenet(props) {
  return (
    <div className={styles.container}>
      <h2>Home</h2>
      <div className={styles.hairline}></div>
      <Cards />
    </div>
  );
}
