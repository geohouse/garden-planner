import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { PlantsType } from "./GardenPlannerInterfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// interface BloomTimeObj {
//   [key: number]: string;
// }

// interface PlantsType {
//   id: number;
//   plantName: string;
//   bloomTime: BloomFruitTimeObj;
//   fruitTime: BloomFruitTimeObj;
//   otherTime: BloomFruitTimeObj;
//   bloomColor: string;
//   bloomColorName: string;
//   wildlifeAttractedBloom: WildlifeAttractedBloomType;
//   wildlifeAttractedFruit: WildlifeAttractedFruitType;
//   wildlifeAttractedOther: WildlifeAttractedOtherType;
// }

// interface BloomFruitTimeObj {
//   monthNumAsStringArray: string[];
//   monthNameArray: string[];
// }

interface PlantPlotProps {
  inputPlants: PlantsType[];
}

export default function PlantPlot(props: PlantPlotProps) {
  const inputPlants = props.inputPlants;
  console.log("plant plot");
  console.log(inputPlants);

  const monthLabels = [
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
    "Jan",
  ];

  function determinePlantCharsToPlot(inputPlantObj: PlantsType) {
    let plantCharacteristicsToPlot: [
      "" | "bloomTime" | "fruitTime" | "otherTime"
    ] = [""];
    if (inputPlantObj.bloomTime.monthNameArray.length > 0) {
      plantCharacteristicsToPlot.push("bloomTime");
    }
    if (inputPlantObj.fruitTime.monthNameArray.length > 0) {
      plantCharacteristicsToPlot.push("fruitTime");
    }
    if (inputPlantObj.otherTime.monthNameArray.length > 0) {
      plantCharacteristicsToPlot.push("otherTime");
    }
    return plantCharacteristicsToPlot;
  }

  function createSinglePlantData(
    inputPlantObj: PlantsType,
    plantIndex: number
  ) {
    const plantCharacteristicsToPlot = determinePlantCharsToPlot(inputPlantObj);
    const templateArray = Array.from({ length: 12 });
    let singlePlantPlotDataArray = [];
    for (
      let plantCharIndex = 0;
      plantCharIndex < plantCharacteristicsToPlot.length;
      plantCharIndex++
    ) {
      let plantEvent = plantCharacteristicsToPlot[plantCharIndex];
      // Keep going if this was the initial placeholder empty string in the array
      if (plantEvent === "") {
        continue;
      } else {
        let plantEventArray = [...templateArray];
        inputPlantObj[plantEvent].monthNumAsStringArray.forEach(
          (timeEntryStr) => {
            const timeEntryNum = Number.parseInt(timeEntryStr, 10);
            // Fill in the graph entry to span the bloom month start and the bloom month end
            // Graph indices are 0-based
            if (plantEvent === "bloomTime") {
              plantEventArray[timeEntryNum - 1] = plantIndex + 1;
              plantEventArray[timeEntryNum] = plantIndex + 1;
            }
            if (plantEvent === "fruitTime") {
              plantEventArray[timeEntryNum - 1] = plantIndex + 0.9;
              plantEventArray[timeEntryNum] = plantIndex + 0.9;
            }
            if (plantEvent === "otherTime") {
              plantEventArray[timeEntryNum - 1] = plantIndex + 0.8;
              plantEventArray[timeEntryNum] = plantIndex + 0.8;
            }
          }
        );
        let borderColor: string = "",
          backgroundColor: string = "";
        if (plantEvent === "bloomTime") {
          borderColor = backgroundColor = inputPlantObj.bloomColor;
        }
        if (plantEvent === "fruitTime") {
          borderColor = backgroundColor = "#aa0099";
        }
        if (plantEvent === "otherTime") {
          borderColor = backgroundColor = "#855200";
        }
        const currPlantForGraph = {
          label: `${inputPlantObj.plantName} ${plantEvent}`,
          data: plantEventArray,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        };
        singlePlantPlotDataArray.push(currPlantForGraph);
      }
    }
    return singlePlantPlotDataArray;
  }

  function createDatasets() {
    //const numPlants = inputPlants.length;
    // Initialize a holder array with undefined values (any surviving
    // undefined entries just appear as holes in the graph)

    // for (let plantTime of ["bloom", "fruit", "other"]) {
    //   const tempArray = Array.from({ length: 12 });
    // }
    // const templateBloomArray = Array.from({ length: 12 });
    // const templateFruitArray = Array.from({ length: 12 });
    // const templateOtherArray = Array.from({ length: 12 });
    //console.log({ numPlants });
    let datasetArray = [];
    for (let plantIndex = 0; plantIndex < inputPlants.length; plantIndex++) {
      let currPlant = inputPlants[plantIndex];
      let currPlantDataArray = createSinglePlantData(currPlant, plantIndex);
      // Need to unpack array of objects and add each to the cumulative array to plot
      for (let plantPlotData of currPlantDataArray) {
        datasetArray.push(plantPlotData);
      }
    }
    return datasetArray;
  }
  // let bloomArray = [...templateBloomArray];
  // let fruitArray = [...templateFruitArray];
  // let otherArray = [...templateOtherArray];
  // Only prep the graph data if there was at least 1 bloom time noted.
  // Otherwise the array to plot will all be undefined values, and nothing will
  // show on the graph.
  // const monthNumAsStringArray_bloom: string[] =
  //   plant.bloomTime.monthNumAsStringArray;
  // const monthNumAsStringArray_fruit: string[] =
  //   plant.fruitTime.monthNumAsStringArray;
  // const monthNumAsStringArray_other: string[] =
  //   plant.otherTime.monthNumAsStringArray;
  // if (monthNumAsStringArray_bloom.length > 0) {
  //   //console.log("Firing if");
  //   monthNumAsStringArray_bloom.forEach((bloomTimeEntryStr) => {
  //     const bloomTimeEntryNum = Number.parseInt(bloomTimeEntryStr, 10);
  //     // Fill in the graph entry to span the bloom month start and the bloom month end
  //     // Graph indices are 0-based
  //     bloomArray[bloomTimeEntryNum - 1] = plantIndex + 1;
  //     bloomArray[bloomTimeEntryNum] = plantIndex + 1;
  //     //console.log({ bloomArray });
  //   });
  // }

  // if (monthNumAsStringArray_fruit.length > 0) {
  //   //console.log("Firing if");
  //   monthNumAsStringArray_fruit.forEach((fruitTimeEntryStr) => {
  //     const fruitTimeEntryNum = Number.parseInt(fruitTimeEntryStr, 10);
  //     // Fill in the graph entry to span the bloom month start and the bloom month end
  //     // Graph indices are 0-based
  //     fruitArray[fruitTimeEntryNum - 1] = plantIndex + 0.9;
  //     fruitArray[fruitTimeEntryNum] = plantIndex + 0.9;
  //     //console.log({ bloomArray });
  //   });
  // }

  // if (monthNumAsStringArray_other.length > 0) {
  //   //console.log("Firing if");
  //   monthNumAsStringArray_other.forEach((otherTimeEntryStr) => {
  //     const otherTimeEntryNum = Number.parseInt(otherTimeEntryStr, 10);
  //     // Fill in the graph entry to span the bloom month start and the bloom month end
  //     // Graph indices are 0-based
  //     otherArray[otherTimeEntryNum - 1] = plantIndex + 0.8;
  //     otherArray[otherTimeEntryNum] = plantIndex + 0.8;
  //     //console.log({ bloomArray });
  //   });
  // }
  //console.log(bloomArray);

  // const currPlantForGraph = {
  //   label: plant.plantName,
  //   data: bloomArray,
  //   borderColor: plant.bloomColor,
  //   backgroundColor: plant.bloomColor,
  // };
  //return currPlantForGraph;

  const plottingData = createDatasets();

  // const tester = createDatasets();
  // console.log("tester");
  // console.log(tester);

  // const dataToGraph = {
  //   labels: monthLabels,
  //   datasets: createDatasets(),
  // };

  //   const testData = {
  //     labels: ["Jan", "Feb", "Mar"],
  //     datasets: [
  //       {
  //         label: "Test1",
  //         data: [100, 100, 100],
  //         borderColor: "rgb(255,0,0)",
  //         backgroundColor: "rgba(255,0,0,0.5)",
  //       },
  //       {
  //         label: "Test2",
  //         data: [150, 150, 150],
  //         borderColor: "rgb(0,255,0)",
  //         backgroundColor: "rgba(0,255,0,0.5)",
  //       },
  //     ],
  //   };

  const dataToGraph = {
    labels: monthLabels,
    datasets: plottingData,
  };

  console.log("Data to graph is:");
  console.log(dataToGraph);
  //return <></>;
  return <Line data={dataToGraph} />;
}
