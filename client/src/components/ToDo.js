export function ToDo(props) {
  console.log(props);
  return (
    <div>
      <div>To Do</div>
      {props.element.map((e) => {
        if (e.task === "ToDo") {
          return <div> {e.name} </div>;
        } else {
          return [];
        }
      })}
    </div>
  );
}
