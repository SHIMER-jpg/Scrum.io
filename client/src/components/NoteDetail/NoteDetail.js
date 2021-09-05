import styles from "./NoteDetail.module.css";
const NoteDetail = ({ userName, content, userPicture }) => {
  return (
    <div className={styles.container}>
      <div className={styles.userBox}>
        <img src={userPicture} />
        <p>{userName}</p>
      </div>
      <span>{content}</span>
    </div>
  );
};

export default NoteDetail;
