export function Done(props) {
  return (
    <div>
      <div>Done</div>
      {props.element.map((e) => {
        if (e.task === "Done") {
          return <div> {e.name} </div>;
        } else {
          return [];
        }
      })}
    </div>
  );
}
