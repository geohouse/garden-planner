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

  const plottingOptions = {
    scales: {
      y: {
        ticks: {
          color: "#ff0000",
          // callback: function(val, index) {
          //   // Hide every 2nd tick label
          //   return index % 2 === 0 ? this.getLabelForValue(val) : '';
          // },
        },
      },
      x: {
        ticks: {
          color: "#00ffff",
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
