import Plant from "./Plant.js";

export default function PlantList(props) {
  return (
    <>
      <ul className="plantList">
        {props.inputPlants.map((plant) => {
          return (
            <li key={plant.id}>
              <Plant plantInfo={plant} />
              <button
                className="delete-plant"
                onClick={() => props.onDeletePlantClick(plant.id)}
              >
                Remove plant from list
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
