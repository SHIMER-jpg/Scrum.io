import styles from "./NoteDetail.module.css";
import { IoClose } from "react-icons/io5";

const NoteDetail = ({
  id,
  userName,
  content,
  userPicture,
  removeNote,
  render,
}) => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.userBox}>
          <img src={userPicture} alt={userName} />
          <p>{userName}</p>
        </div>
        {render && (
          <button onClick={() => removeNote(id)}>
            <IoClose size={24} />
          </button>
        )}
      </header>
      <span>{content}</span>
    </div>
  );
};

export default NoteDetail;
