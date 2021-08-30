export function Card({ elements, name }) {
  return (
    <div>
      <div>{name}</div>
      {elements.length ? (
        elements.map((e) => {
          return <div>{e.name} </div>;
        })
      ) : (
        <div>not activities added yet</div>
      )}
    </div>
  );
}
