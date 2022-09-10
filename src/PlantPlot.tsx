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

import type { Tick } from "chart.js";

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

  // will be used to create the correct y axis tick marks and labels
  let yTickArray: { bloom: number; fruit: number; other: number }[] = [];

  function createYTickObj_singlePlant(plantIndex: number) {
    const holderObj = {
      bloom: plantIndex + 1,
      fruit: plantIndex + 0.9,
      other: plantIndex + 0.8,
    };
    yTickArray.push(holderObj);
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
      // Pass the index to make the ytick label data structure
      createYTickObj_singlePlant(plantIndex);
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

  const plottingData = createDatasets();

  const dataToGraph = {
    labels: monthLabels,
    datasets: plottingData,
  };

  let bloomArray: number[] = [];
  let fruitArray: number[] = [];
  let otherArray: number[] = [];

  for (let typeObj of yTickArray) {
    bloomArray.push(typeObj.bloom);
    fruitArray.push(typeObj.fruit);
    otherArray.push(typeObj.other);
  }
  // combined array needed in order to filter the ticks to just include those represented in this array
  const combinedArray = bloomArray.concat(fruitArray).concat(otherArray);

  // I was getting lots of type errors when setting the ticks callback - it's supposed to be a fancy
  // intersection type combining lots of different subtypes for the Line component, but was very hard
  // for me to understand what was missing and needed to be typed differently, so I'm making plottingOptions
  // an 'any' type to avoid the type errors and to continue on. I realize this isn't the best,
  // but it's the only way I could clear this error for now.
  const plottingOptions: any = {
    scales: {
      y: {
        // Filter the y axis ticks to only include those that are represented by a plant event (bloom, fruit, other)
        // and ensure that those are created. I don't know the type of the input axis parameter to the afterBuildTicks
        // function, so set to any.
        afterBuildTicks: function (axis: any): void {
          axis.ticks = combinedArray.map((entry) => ({ value: entry }));
        },
        ticks: {
          //color: "#ff0000",

          // types for callback function
          // The Tick[] type is found from the types definition file (https://github.com/chartjs/Chart.js/blob/master/types/index.d.ts)
          // and allows for correct typing/autocompletion of property names below.
          // Interface for Tick from the .d.ts file:
          // export interface Tick {
          //   value: number;
          //   label?: string | string[];
          //   major?: boolean;
          // }

          // This is the function that sets the labels on the y axis ticks
          callback: function (
            value: number,
            index: number,
            ticks: Tick[]
          ): string | undefined {
            // ticks is an array of objects with each object having 'value', 'label', and '$context' keys.
            // 'value' is the tick mark value on the axis, and 'label' is the current tick label
            // index is the object number in the ticks array that represents the current value.

            // Determine the correct tick label to return
            return bloomArray.includes(value)
              ? "Bloom"
              : fruitArray.includes(value)
              ? "Fruit"
              : otherArray.includes(value)
              ? "Other"
              : undefined;
          },
        },
      },
      x: {
        ticks: {
          //color: "#00ffff",
        },
      },
    },
  };

  // const plottingOptions = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Testing chart!",
  //     },
  //   },
  // };

  console.log("Data to graph is:");
  console.log(dataToGraph);
  //return <></>;
  return <Line data={dataToGraph} options={plottingOptions} />;
}
