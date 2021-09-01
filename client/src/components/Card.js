import styles from "../styles/TodoCard.module.css";
export function Card({ elements, name }) {
  return (
    <div>
      <div className={styles.TodoCard_Header}>
        <h3>{name}</h3>
        <span className={styles.TodoCard_StoryPoints}>12 SP</span>
      </div>
      {elements.length ? (
        elements.map((e) => {
          return (
            <div className={styles.TodoCard_Body}>
              <p>{e.name}</p>
            </div>
          );
        })
      ) : (
        <div>not activities added yet</div>
      )}
    </div>
  );
}
