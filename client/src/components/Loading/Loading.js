import styles from "./Loading.module.css";

const Loading = ({ isCentered }) => {
  return (
    <div
      style={{ margin: `${isCentered ? "30px auto" : "30px 0"}` }}
      className={styles.ldsDualRing}
    ></div>
  );
};

export default Loading;
