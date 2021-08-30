export function InProgress(props) {
  console.log(props);
  return (
    <div>
      <div>In Progress</div>
      {props.element.map((e) => {
        if (e.task === "inProgress") {
          return <div> {e.name} </div>;
        } else {
          return [];
        }
      })}
    </div>
  );
}
