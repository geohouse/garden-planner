import AddPlant from "./AddPlant.js";
import PlantList from "./PlantList.js";
import { useState } from "react";
import PlantPlot from "./PlantPlot.js";

export default function GardenPlanner() {
  const [plantName, setPlantName] = useState("");
  const [bloomTime, setBloomTime] = useState({
    monthNumAsStringArray: ["1"],
    monthNameArray: ["Jan"],
  });
  const [bloomColor, setBloomColor] = useState("#E66465");
  const [wildlifeAttracted, setWildlifeAttracted] = useState({
    bees: false,
    butterflies: false,
    hummingbirds: false,
  });
  // Will need to read back from local storage later.
  const [plants, setPlants] = useState([]);

  function handleNameChange(event) {
    setPlantName(event.target.value);
  }
  console.log(`The plant name is: ${plantName}`);

  function handleBloomTimeChange(event) {
    const monthNames = [
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
    const selectedMonthNum = Number.parseInt(event.target.value, 10);
    // Convert the selected number (1-based) to a lookup index for month
    const selectedMonthName = monthNames[selectedMonthNum - 1];
    // The range input for month selection is a controlled component,
    // so need React to both provide it with its updated value and to
    // keep track of the month name corresponding to the month num (as a string).
    // Do that in an object.
    setBloomTime({
      monthNumAsStringArray: [event.target.value],
      monthNameArray: [selectedMonthName],
    });
  }

  console.log(`The bloom time is: ${bloomTime["monthNameArray"]}`);

  function handleBloomColorChange(event) {
    setBloomColor(event.target.value);
  }

  console.log(`The bloom color is: ${bloomColor}`);

  function handleWildlifeAttractedChange(event) {
    // Returns the id of the input element(checkbox) that changed.
    // Will be 'attracts-bees', 'attracts-butterflies', or 'attracts-hummingbirds'
    const wildlifeChanged = event.target.id;
    // Returns 'bees', 'butterflies', or 'hummingbirds' that match the keys in the wildlifeAttracted object
    const wildlifeChangedStem = wildlifeChanged.split("-")[1];

    // Need to use [] in the key assignment after the spread operator
    // to have the evaluated wildlifeChangedStem value used (and overwriting the previous value with the toggled boolean)
    setWildlifeAttracted({
      ...wildlifeAttracted,
      [wildlifeChangedStem]: !wildlifeAttracted[wildlifeChangedStem],
    });
  }
  console.log(wildlifeAttracted);

  function handlePlantSubmit(event) {
    event.preventDefault();

    setPlants([
      ...plants,
      {
        id: plants.length + 1,
        plantName: plantName,
        bloomTime: bloomTime,
        bloomColor: bloomColor,
        wildlifeAttracted: wildlifeAttracted,
      },
    ]);
  }
  console.log(`Here's the plant list:`);
  console.log(plants);

  // The plantID is passed back from the PlantList component
  // and represents the plant where the delete button was clicked
  function handleDeletePlantClick(plantID) {
    //console.log(plantID);
    setPlants(plants.filter((plant) => plant.id !== plantID));
  }

  return (
    <>
      <AddPlant
        plantName={plantName}
        onNameChange={handleNameChange}
        bloomTime={bloomTime}
        onBloomTimeChange={handleBloomTimeChange}
        bloomColor={bloomColor}
        onBloomColorChange={handleBloomColorChange}
        wildlifeAttracted={wildlifeAttracted}
        onWildlifeAttractedChange={handleWildlifeAttractedChange}
        onPlantSubmit={handlePlantSubmit}
      />
      {/*<PlantPlot inputPlants={plants} />*/}
      <PlantList
        inputPlants={plants}
        onDeletePlantClick={handleDeletePlantClick}
      />
    </>
  );
}
