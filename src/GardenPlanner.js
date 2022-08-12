import NewPlant from "./NewPlant.js";
import { useState } from "react";

export default function GardenPlanner() {
  const [plantName, setPlantName] = useState("");
  const [bloomTime, setBloomTime] = useState({});
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

  return (
    <>
      <NewPlant
        plantName={plantName}
        onNameChange={handleNameChange}
        bloomTime={bloomTime}
        onBloomTimeChange={handleBloomTimeChange}
      />
    </>
  );
}
