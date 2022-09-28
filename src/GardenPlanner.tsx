import AddPlant from "./AddPlant";
import PlantList from "./PlantList";
import { useState } from "react";
import PlantPlot from "./PlantPlot";
import { BloomFruitTimeObj, PlantsType } from "./GardenPlannerInterfaces";

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
  const [bloomTime, setBloomTime] = useState({});
  const [fruitTime, setFruitTime] = useState({});
  const [otherTime, setOtherTime] = useState({});
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
  const [wildlifeSortStartOfYearToggle, setWildlifeSortStartOfYearToggle] =
    useState({
      bloom: true,
      fruit: true,
      other: true,
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

    // If an empty object was returned (when all months have been toggled off),
    // then need to explicitly re-set to arrays with empty strings, otherwise other code fails
    if (Object.keys(selectedMonthObj).length === 0) {
      setBloomTime({});
    } else {
      // spread into new object so selectedMonthObj isn't wrapped in another object
      setBloomTime({ ...selectedMonthObj });
    }
    console.log("bloom time object is:");
    console.log(bloomTime);
    console.log(selectedMonthObj);
  }

  function handleFruitTimeChange(selectedMonthObj: { [key: number]: string }) {
    // If an empty object was returned (when all months have been toggled off),
    // then need to explicitly re-set to arrays with empty strings, otherwise other code fails
    if (Object.keys(selectedMonthObj).length === 0) {
      setFruitTime({});
    } else {
      // spread into new object so selectedMonthObj isn't wrapped in another object
      setFruitTime({ ...selectedMonthObj });
    }
    console.log("fruit time object is:");
    console.log(fruitTime);
    //console.log(otherTime);
  }

  function handleOtherTimeChange(selectedMonthObj: { [key: number]: string }) {
    // If an empty object was returned (when all months have been toggled off),
    // then need to explicitly re-set to arrays with empty strings, otherwise other code fails
    if (Object.keys(selectedMonthObj).length === 0) {
      setOtherTime({});
    } else {
      // spread into new object so selectedMonthObj isn't wrapped in another object
      setOtherTime({ ...selectedMonthObj });
    }
    console.log("other time object is:");
    console.log(otherTime);
    //console.log(fruitTime);
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
    // Reset the values of the controlled elements after a plant is
    // added in order to clear the AddPlant form
    setPlantName("");
    setBloomTime({});
    setFruitTime({});
    setOtherTime({});
    setBloomColor("");
    setBloomColorName("");
    setWildlifeAttractedBloom({
      bees: false,
      butterflies: false,
      hummingbirds: false,
      songbirds: false,
      other: false,
    });
    setWildlifeAttractedFruit({
      songbirds: false,
      mammals: false,
      other: false,
    });
    setWildlifeAttractedOther({
      bees: false,
      butterflies: false,
      hummingbirds: false,
      songbirds: false,
      mammals: false,
      other: false,
    });
  }
  //console.log(`Here's the plant list:`);
  //console.log(plants);

  // The plantID is passed back from the PlantList component
  // and represents the plant where the delete button was clicked
  function handleDeletePlantClick(plantID: number) {
    //console.log(plantID);
    setPlants(plants.filter((plant) => plant.id !== plantID));
  }

  function getFirstEventDuration(plantEventMonthNumAsStringArray: string[]) {
    // if the input is an empty array (will be if the plant event e.g. bloom isn't specified for the current plant)
    // then return 0
    if (plantEventMonthNumAsStringArray[0] === "") {
      return 0;
    }

    // convert to array of numbers
    const monthNumArray = plantEventMonthNumAsStringArray.map(
      (monthNumString) => Number.parseInt(monthNumString, 10)
    );

    let currentMonthNum = 0;
    let nextMonthNum = 0;

    // Will keep track of how long (in months) the first instance of the event for the plant lasts
    // e.g. blooming starts in May and ends in August, so duration will be 4
    // e.g. other wildlife attracted by leaves from March - May, then twigs from Oct-Dec, so duration will be 3 (
    // only consider the first instance of the event in a calendar year, so only consider the leaves dates)
    let eventDuration = 1;
    // this is a loop with a look-ahead condition to check the next month number compared to the current one,
    // so needs to end 1 before the end of the array
    for (
      let monthIndex = 0;
      monthIndex < monthNumArray.length - 1;
      monthIndex++
    ) {
      currentMonthNum = monthNumArray[monthIndex];
      nextMonthNum = monthNumArray[monthIndex + 1];
      console.log({ currentMonthNum });
      console.log({ nextMonthNum });
      if (nextMonthNum === currentMonthNum + 1) {
        eventDuration++;
        continue;
      } else {
        console.log("return 1");
        console.log({ eventDuration });
        return eventDuration;
      }
    }
    console.log("return 2");
    console.log({ eventDuration });
    return eventDuration;
  }

  function reSortPlantsArray(plantReSortIndexArray: number[]) {
    let tempPlantResortArr: PlantsType[] = [];
    plantReSortIndexArray.forEach((index) => {
      // because .filter returns an array, but need to push just the PlantsType within that array (otherwise type error)
      // need to access and return the [0] element of it.
      let currPlant = plants.filter((plant) => plant.id === index)[0];
      tempPlantResortArr.push(currPlant);
    });
    console.log("re-sorting");
    console.log(tempPlantResortArr);
    setPlants(tempPlantResortArr);
  }

  function generatePlantReSortArray(
    sortedInputObj: {
      [key: string]: { plantID: number; eventDuration: number }[];
    },
    plantEvent: string
  ): number[] {
    let plantReSortArrayOrder = [];
    // The key order of any obj is NOT guaranteed, so need to loop through following the month
    // order in order to provide the plants id order array to use for re-ordering the list of Plants objects

    // Toggle the month order with each press of the sort button (the state used below in the if statement is toggled with each click)
    // in order to toggle whether the plants are ordered in the graph and list with ones blooming earlier in the year listed first
    // or those blooming later in the year

    let monthHolder: string[] = [];
    if (
      wildlifeSortStartOfYearToggle[
        plantEvent as keyof typeof wildlifeSortStartOfYearToggle
      ]
    ) {
      monthHolder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    } else {
      monthHolder = [
        "Dec",
        "Nov",
        "Oct",
        "Sep",
        "Aug",
        "Jul",
        "Jun",
        "May",
        "Apr",
        "Mar",
        "Feb",
        "Jan",
      ];
    }
    for (let month of monthHolder) {
      // Skip any months that aren't the start of the type of selected event for any of the plants
      if (sortedInputObj[month].length === 0) {
        continue;
      } else {
        let currMonthArrayEntry = sortedInputObj[month];
        for (
          let entryIndex = 0;
          entryIndex < currMonthArrayEntry.length;
          entryIndex++
        ) {
          let currPlantID = currMonthArrayEntry[entryIndex].plantID;
          plantReSortArrayOrder.push(currPlantID);
        }
      }
    }
    return plantReSortArrayOrder;
  }

  function handlePlantSortClick(eventTypeToSort: string) {
    // The array value for each month key will be an array of objects (one object for each plant). Each month object will hold
    // an array of objects representing which plants from the plants state object have their first blooming/fruiting/other wildlife attracting
    // month of the year that month. Each of those plant objects has a key of the
    // index of the plant it represents (index in the plants state object), and a value of how many consecutive months that plant blooms starting in the current month
    //
    let holderObj: {
      [key: string]: { plantID: number; eventDuration: number }[];
    } = {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: [],
    };

    // don't mutate the original holder, but create a new sorted copy within each month
    let holderObj_sorted: {
      [key: string]: { plantID: number; eventDuration: number }[];
    } = {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: [],
    };

    plants.forEach((plant) => {
      console.log(eventTypeToSort);
      console.log("plant entry");
      console.log(plant);
      // Need to add 'Time' to the end of each of the event types for the lookup to match a key
      let inputPlantEventObject = plant[
        `${eventTypeToSort}Time` as keyof PlantsType
      ] as keyof BloomFruitTimeObj;
      // Get the first month of the event. Will be used to index into the correct month key in the holderObj
      // If the startEventMonth would otherwise be undefined (if there's no plant event e.g. bloom specified for the current plant)
      // then set the start month to "Jan"
      const startEventMonth =
        Object.values(inputPlantEventObject)[0] === undefined ||
        Object.values(inputPlantEventObject)[0] !== ""
          ? Object.values(inputPlantEventObject)[0]
          : "Jan";
      // returns 0 duration if the current plant doesn't have the event (e.g. blooming) specified
      let firstEventDuration = getFirstEventDuration(
        Object.keys(inputPlantEventObject)
      );

      console.log(Object.values(inputPlantEventObject)[0]);
      console.log({ startEventMonth });
      console.log({ firstEventDuration });

      // Add the current plant's object to the holderObj.
      holderObj[startEventMonth as keyof typeof holderObj].push({
        plantID: plant.id,
        eventDuration: firstEventDuration,
      });
      console.log("holder obj is:");
      console.log(holderObj);

      // Need to sort the array of objects within each holderObj's month by the eventDuration (increasing)
      // do this by providing a custom compare function to array.sort()
      for (let monthKey in holderObj) {
        // spreading into a new array is critical to avoid mutating the holderObj entries
        let currMonthArray = [...holderObj[monthKey]];
        // sorts (in place)
        // With each successive press of the sort button, this toggles (through a toggled state set on each button press)
        // whether plants with the same event (e.g. bloom) start time (but different durations) are sorted
        // with shortest duration ahead, or longest duration ahead.
        if (
          wildlifeSortStartOfYearToggle[
            eventTypeToSort as keyof typeof wildlifeSortStartOfYearToggle
          ]
        ) {
          console.log("firing true");
          currMonthArray.sort(function (a, b) {
            return b.eventDuration - a.eventDuration;
          });
        } else {
          console.log("firing false");
          currMonthArray.sort(function (a, b) {
            return a.eventDuration - b.eventDuration;
          });
        }

        holderObj_sorted[monthKey as keyof typeof holderObj_sorted] =
          currMonthArray;
      }
    });

    console.log("sorted holder is:");
    console.log(holderObj_sorted);

    console.log("original");
    console.log(wildlifeSortStartOfYearToggle);
    // for the type of event selected, toggle whether it's now set (on its next click)
    // to sort from the start of the year or the end of the year.
    let newWildlifeEventToggle = { ...wildlifeSortStartOfYearToggle };
    newWildlifeEventToggle[
      eventTypeToSort as keyof typeof newWildlifeEventToggle
    ] =
      !wildlifeSortStartOfYearToggle[
        eventTypeToSort as keyof typeof wildlifeSortStartOfYearToggle
      ];
    console.log(newWildlifeEventToggle);
    setWildlifeSortStartOfYearToggle(newWildlifeEventToggle);

    //   const [wildlifeSortStartOfYearToggle, setWildlifeSortStartOfYearToggle] =
    // useState({
    //   bloom: true,
    //   fruit: true,
    //   other: true,
    // });

    // Will hold the order that the Plants array should be updated to in order for its Plants to be sorted correctly
    // the array elements are the index values of each plant in the original Plants array.
    let plantResortArrayOrder = generatePlantReSortArray(
      holderObj_sorted,
      eventTypeToSort
    );
    console.log(plantResortArrayOrder);

    // Re-sort the Plants array
    reSortPlantsArray(plantResortArrayOrder);
  }

  return (
    <>
      <AddPlant
        plantName={plantName}
        onNameChange={handleNameChange}
        bloomColorName={bloomColorName}
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
        onPlantSortClick={handlePlantSortClick}
      />
    </>
  );
}

// (local function) handleWildlifeAttractedChange(event: React.ChangeEvent<HTMLInputElement>, stateUpdateFxn: (value: React.SetStateAction<{
//   [key: string]: boolean;
// }>) => void, currState: {
//   [key: string]: boolean;
// }): void
