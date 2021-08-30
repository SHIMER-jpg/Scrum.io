export function Stories(props) {
  console.log(props);
  return (
    <div>
      <div>Stories</div>
      {props.element.map((e) => {
        if (e.task === "Stories") {
          return <div> {e.name} </div>;
        } else {
          return [];
        }
      })}
    </div>
  );
}
