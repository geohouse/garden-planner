import Plant from "./Plant.js";

export default function PlantList(props) {
  return (
    <>
      <ul className="plantList">
        {props.inputPlants.map((plant) => {
          return (
            <li key={plant.id}>
              <Plant plantInfo={plant} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
