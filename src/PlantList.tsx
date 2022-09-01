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
}

export default function PlantList(props: PlantListProps) {
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
