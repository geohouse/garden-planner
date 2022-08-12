import NewPlant from "./NewPlant.js";
import { useState } from "react";

export default function GardenPlanner() {
  const [plantName, setPlantName] = useState("");
  const [bloomTime, setBloomTime] = useState({
    monthNumAsString: "1",
    monthName: "Jan",
  });
  const [bloomColor, setBloomColor] = useState("#E66465");
  const [wildlifeAttracted, setWildlifeAttracted] = useState({
    bees: false,
    butterflies: false,
    hummingbirds: false,
  });

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
      monthNumAsString: event.target.value,
      monthName: selectedMonthName,
    });
  }

  console.log(`The bloom time is: ${bloomTime["monthName"]}`);

  function handleBloomColorChange(event) {
    setBloomColor(event.target.value);
  }

  console.log(`The bloom color is: ${bloomColor}`);

  function handleWildlifeAttractedChange(event) {
    // Returns the id of the input element(checkbox) that changed.
    // Will be 'attracts-bees', 'attracts-butterflies', or 'attracts-hummingbirds'
    const wildlifeChanged = event.target.id;
    // Returns 'bees', 'butterflies', or 'hummingbirds'
    const wildlifeChangedStem = wildlifeChanged.split("-")[1];

    // Need to use [] in the key assignment after the spread operator
    // to have the evaluated wildlifeChangedStem value used
    setWildlifeAttracted({
      ...wildlifeAttracted,
      [wildlifeChangedStem]: !wildlifeAttracted[wildlifeChangedStem],
    });
  }
  console.log(wildlifeAttracted);
  return (
    <>
      <NewPlant
        plantName={plantName}
        onNameChange={handleNameChange}
        bloomTime={bloomTime}
        onBloomTimeChange={handleBloomTimeChange}
        bloomColor={bloomColor}
        onBloomColorChange={handleBloomColorChange}
        wildlifeAttracted={wildlifeAttracted}
        onWildlifeAttractedChange={handleWildlifeAttractedChange}
      />
    </>
  );
}
