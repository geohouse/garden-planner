import AddPlant from "./AddPlant";
import PlantList from "./PlantList";
import { useState } from "react";
import PlantPlot from "./PlantPlot";
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

export default function GardenPlanner() {
  const [plantName, setPlantName] = useState("");
  const [bloomTime, setBloomTime] = useState({
    monthNumAsStringArray: [""],
    monthNameArray: [""],
  });
  const [fruitTime, setFruitTime] = useState({
    monthNumAsStringArray: [""],
    monthNameArray: [""],
  });
  const [otherTime, setOtherTime] = useState({
    monthNumAsStringArray: [""],
    monthNameArray: [""],
  });
  const [bloomColor, setBloomColor] = useState("");
  const [bloomColorName, setBloomColorName] = useState("");
  // This sets the useState object type to be more inclusive and take any string as a key
  // instead of the default Union of 'bees'|'butterflies'|'hummingbirds'
  // because later in the code there is a wildlife type string used as a key index into the object
  // and this fails unless the key type is the generic string.
  const [wildlifeAttractedBloom, setWildlifeAttractedBloom] = useState({
    bees: false,
    butterflies: false,
    hummingbirds: false,
    songbirds: false,
    other: false,
  });

  const [wildlifeAttractedFruit, setWildlifeAttractedFruit] = useState({
    songbirds: false,
    mammals: false,
    other: false,
  });

  const [wildlifeAttractedOther, setWildlifeAttractedOther] = useState({
    bees: false,
    butterflies: false,
    hummingbirds: false,
    songbirds: false,
    mammals: false,
    other: false,
  });

  // Will need to read back from local storage later.
  // The type is an array (of objects) having the PlantsType
  const [plants, setPlants] = useState<PlantsType[]>([]);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlantName(event.target.value);
  }
  //console.log(`The plant name is: ${plantName}`);

  function handleBloomTimeChange(selectedMonthObj: { [key: number]: string }) {
    // const monthNames = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];
    // const selectedMonthNum = Number.parseInt(event.target.value, 10);
    // // Convert the selected number (1-based) to a lookup index for month
    // const selectedMonthName = monthNames[selectedMonthNum - 1];
    // The range input for month selection is a controlled component,
    // so need React to both provide it with its updated value and to
    // keep track of the month name corresponding to the month num (as a string).
    // Do that in an object.
    setBloomTime({
      monthNumAsStringArray: Object.keys(selectedMonthObj),
      monthNameArray: Object.values(selectedMonthObj),
    });
    console.log("bloom time object is:");
    console.log(bloomTime);
    console.log(selectedMonthObj);
  }

  function handleFruitTimeChange(selectedMonthObj: { [key: number]: string }) {
    setFruitTime({
      monthNumAsStringArray: Object.keys(selectedMonthObj),
      monthNameArray: Object.values(selectedMonthObj),
    });
    console.log("fruit time object is:");
    console.log(fruitTime);
  }

  function handleOtherTimeChange(selectedMonthObj: { [key: number]: string }) {
    setOtherTime({
      monthNumAsStringArray: Object.keys(selectedMonthObj),
      monthNameArray: Object.values(selectedMonthObj),
    });
    console.log("other time object is:");
    console.log(otherTime);
  }

  //console.log(`The bloom time is: ${bloomTime["monthNameArray"]}`);

  function handleBloomColorChange(hexColor: string, colorName: string) {
    setBloomColor(hexColor);
    setBloomColorName(colorName);
    console.log("Bloom color is:");
    console.log(bloomColor);
  }

  //console.log(`The bloom color is: ${bloomColor}`);

  // Would like to generalize this function similar to below to have all 3
  // attracts wildlife types set by the same function with input parameter telling
  // the function which one to set, but can't get this working right now.

  // function handleWildlifeAttractedChange(
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   stateUpdateFxn: (
  //     value: React.SetStateAction<{ [key: string]: boolean }>
  //   ) => void,
  //   currState: { [key: string]: boolean }
  // ): void {
  //   // Returns the id of the input element (checkbox) that changed.
  //   // will be e.g. 'attracts-bees', 'attracts-butterflies', etc.
  //   const wildlifeChanged = event.target.id;
  //   const wildlifeChangedStem = wildlifeChanged.split("-")[1];
  //   stateUpdateFxn({
  //     ...currState,
  //     [wildlifeChangedStem]: !currState[wildlifeChangedStem],
  //   });
  // }

  //Type '(event: ChangeEvent<HTMLInputElement>, stateUpdateFxn: (value: SetStateAction<{ [key: string]: boolean; }>) => void, currState: { [key: string]: boolean; }) => void' is missing the following properties from type 'OnWildlifeChangeObj': stateUpdateFxn, currState

  function handleWildlifeAttractedChangeBloom(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // Returns the id of the input element(checkbox) that changed.
    // Will be e.g. 'bloom-attracts-bees', 'bloom-attracts-butterflies', or 'bloom-attracts-hummingbirds'
    const wildlifeChangedBloom = event.target.id;
    // Returns 'bees', 'butterflies', or 'hummingbirds' that match the keys in the wildlifeAttracted object
    const wildlifeChangedStemBloom = wildlifeChangedBloom.split("-")[2];

    // Need to use [] in the key assignment after the spread operator
    // to have the evaluated wildlifeChangedStem value used (and overwriting the previous value with the toggled boolean)
    setWildlifeAttractedBloom({
      ...wildlifeAttractedBloom,
      [wildlifeChangedStemBloom]:
        !wildlifeAttractedBloom[
          wildlifeChangedStemBloom as keyof typeof wildlifeAttractedBloom
        ],
    });
  }

  function handleWildlifeAttractedChangeFruit(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const wildlifeChangedFruit = event.target.id;
    const wildlifeChangedStemFruit = wildlifeChangedFruit.split("-")[2];
    setWildlifeAttractedFruit({
      ...wildlifeAttractedFruit,
      [wildlifeChangedStemFruit]:
        !wildlifeAttractedFruit[
          wildlifeChangedStemFruit as keyof typeof wildlifeAttractedFruit
        ],
    });
  }

  function handleWildlifeAttractedChangeOther(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log(event);
    const wildlifeChangedOther = event.target.id;
    const wildlifeChangedStemOther = wildlifeChangedOther.split("-")[2];
    console.log(wildlifeChangedStemOther);
    setWildlifeAttractedOther({
      ...wildlifeAttractedOther,
      [wildlifeChangedStemOther]:
        !wildlifeAttractedOther[
          wildlifeChangedStemOther as keyof typeof wildlifeAttractedOther
        ],
    });
  }

  //console.log(wildlifeAttracted);

  function handlePlantSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPlants([
      ...plants,
      {
        id: plants.length + 1,
        plantName: plantName,
        bloomTime: bloomTime,
        fruitTime: fruitTime,
        otherTime: otherTime,
        bloomColor: bloomColor,
        bloomColorName: bloomColorName,
        wildlifeAttractedBloom: wildlifeAttractedBloom,
        wildlifeAttractedFruit: wildlifeAttractedFruit,
        wildlifeAttractedOther: wildlifeAttractedOther,
      },
    ]);
  }
  //console.log(`Here's the plant list:`);
  //console.log(plants);

  // The plantID is passed back from the PlantList component
  // and represents the plant where the delete button was clicked
  function handleDeletePlantClick(plantID: number) {
    //console.log(plantID);
    setPlants(plants.filter((plant) => plant.id !== plantID));
  }

  return (
    <>
      <AddPlant
        plantName={plantName}
        onNameChange={handleNameChange}
        bloomTime={bloomTime}
        fruitTime={fruitTime}
        otherTime={otherTime}
        onBloomTimeChange={handleBloomTimeChange}
        onFruitTimeChange={handleFruitTimeChange}
        onOtherTimeChange={handleOtherTimeChange}
        onBloomColorChange={handleBloomColorChange}
        wildlifeAttractedBloom={wildlifeAttractedBloom}
        onWildlifeAttractedChangeBloom={handleWildlifeAttractedChangeBloom}
        wildlifeAttractedFruit={wildlifeAttractedFruit}
        onWildlifeAttractedChangeFruit={handleWildlifeAttractedChangeFruit}
        wildlifeAttractedOther={wildlifeAttractedOther}
        onWildlifeAttractedChangeOther={handleWildlifeAttractedChangeOther}
        onPlantSubmit={handlePlantSubmit}
      />
      <PlantPlot inputPlants={plants} />
      <PlantList
        inputPlants={plants}
        onDeletePlantClick={handleDeletePlantClick}
      />
    </>
  );
}

// (local function) handleWildlifeAttractedChange(event: React.ChangeEvent<HTMLInputElement>, stateUpdateFxn: (value: React.SetStateAction<{
//   [key: string]: boolean;
// }>) => void, currState: {
//   [key: string]: boolean;
// }): void
