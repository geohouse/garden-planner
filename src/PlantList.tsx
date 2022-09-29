import Plant from "./Plant";
import { PlantsType } from "./GardenPlannerInterfaces";

// interface BloomTimeObj {
//   [key: number]: string;
// }

// interface PlantsType {
//   id: number;
//   plantName: string;
//   bloomTime: BloomTimeObj;
//   bloomColor: string;
//   bloomColorName: string;
//   wildlifeAttracted: { [key: number]: boolean };
// }

interface PlantListProps {
  inputPlants: PlantsType[];
  onDeletePlantClick: (plantID: number) => void;
  onPlantSortClick: (eventTypeToSort: string) => void;
}

export default function PlantList(props: PlantListProps) {
  // Need to list the plant cards in the same order that they appear in the
  // graph (with the top-most trace in the graph being the top leftmost card) shown.
  // To make this happen, need to invert the plant list to show the cards in reverse order
  // because the graphing happens from the y axis upward, so the top trace
  // is the plant at the end of the regular plant list.
  function invertPlantList(inputPlantList: PlantsType[]) {
    let invertedPlantList: PlantsType[] = [];
    // Go through the inputPlants backwards, pushing the entries to the new list
    for (
      let plantIndex = props.inputPlants.length - 1;
      plantIndex >= 0;
      plantIndex--
    ) {
      let currPlant = props.inputPlants[plantIndex];
      invertedPlantList.push(currPlant);
    }

    return invertedPlantList;
  }

  let invertedPlantList = invertPlantList(props.inputPlants);
  return (
    <>
      <div className="sort-buttons">
        Sort plants -
        <button
          className="sort-bloom"
          onClick={() => props.onPlantSortClick("bloom")}
        >
          By bloom time
        </button>
        <button
          className="sort-fruit"
          onClick={() => props.onPlantSortClick("fruit")}
        >
          By fruit time
        </button>
        <button
          className="sort-other"
          onClick={() => props.onPlantSortClick("other")}
        >
          By other time
        </button>
      </div>
      <ul className="plantList">
        {invertedPlantList.map((plant) => {
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
