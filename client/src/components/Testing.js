export function Testing(props) {
  console.log(props);
  return (
    <div>
      <div>Testing</div>
      {props.element.map((e) => {
        if (e.task === "Testing") {
          return <div> {e.name} </div>;
        } else {
          return [];
        }
      })}
    </div>
  );
}
