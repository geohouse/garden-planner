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

import annotationPlugin from "chartjs-plugin-annotation";

import type { Tick } from "chart.js";

import { Line } from "react-chartjs-2";

import { PlantsType, BloomFruitTimeObj } from "./GardenPlannerInterfaces";

ChartJS.register(annotationPlugin);

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
    let plantCharacteristicsToPlot: string[] = [];
    if (Object.keys(inputPlantObj.bloomTime).length > 0) {
      plantCharacteristicsToPlot.push("bloomTime");
    }
    if (Object.keys(inputPlantObj.fruitTime).length > 0) {
      plantCharacteristicsToPlot.push("fruitTime");
    }
    if (Object.keys(inputPlantObj.otherTime).length > 0) {
      plantCharacteristicsToPlot.push("otherTime");
    }
    // console.log("Plant chars to plot are");
    // console.log(plantCharacteristicsToPlot);
    return plantCharacteristicsToPlot;
  }

  // To keep track of the plant names and wildlife attracted for each plant, following the
  // same plant order that is used for the plotting
  let plantNameArray: string[] = [];
  let plantWildlifeArray: {
    bloom: string[];
    fruit: string[];
    other: string[];
  }[] = [];

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

  function createWildlifeObj_singlePlant(inputPlantObj: PlantsType) {
    let wildlifeAttractedBloom = Object.keys(
      inputPlantObj.wildlifeAttractedBloom
    ).filter((wildlifeType, index) => {
      if (Object.values(inputPlantObj.wildlifeAttractedBloom)[index]) {
        return wildlifeType;
      }
      return null;
    });
    let wildlifeAttractedFruit = Object.keys(
      inputPlantObj.wildlifeAttractedFruit
    ).filter((wildlifeType, index) => {
      if (Object.values(inputPlantObj.wildlifeAttractedFruit)[index]) {
        return wildlifeType;
      }
      return null;
    });
    let wildlifeAttractedOther = Object.keys(
      inputPlantObj.wildlifeAttractedOther
    ).filter((wildlifeType, index) => {
      if (Object.values(inputPlantObj.wildlifeAttractedOther)[index]) {
        return wildlifeType;
      }
      return null;
    });

    // console.log("Building wildlife list");
    // console.log(Object.keys(inputPlantObj.wildlifeAttractedBloom));
    // console.log(Object.values(inputPlantObj.wildlifeAttractedBloom));
    // console.log({ wildlifeAttractedBloom });
    let holderObj: { bloom: string[]; fruit: string[]; other: string[] } = {
      bloom: wildlifeAttractedBloom,
      fruit: wildlifeAttractedFruit,
      other: wildlifeAttractedOther,
    };

    return holderObj;
  }

  function createSinglePlantData(
    inputPlantObj: PlantsType,
    plantIndex: number
  ) {
    plantNameArray.push(inputPlantObj.plantName);
    let plantWildlifeAttractedObj =
      createWildlifeObj_singlePlant(inputPlantObj);
    plantWildlifeArray.push(plantWildlifeAttractedObj);
    // Pass the index to make the ytick label data structure
    createYTickObj_singlePlant(plantIndex);
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
        // Need to tell TS that the plantEvent is limited to being a PlantsType key, and the indexing
        // operation will return ONLY a BloomFruitTimeObj (not the other types associated with
        // different keys in PlantsType). This allows the dynamic indexing with the plantEvent variable
        // while also correctly being able to access the 'monthNumAsStringArray' array in the 'inputPlantEventArray'
        let inputPlantEventArray = inputPlantObj[
          plantEvent as keyof PlantsType
        ] as BloomFruitTimeObj;
        // The month numbers are the keys
        Object.keys(inputPlantEventArray).forEach((timeEntryStr) => {
          console.log("looping through inputPlantEventArray");
          console.log(timeEntryStr);
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
        });
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

  // This is used to keep track of the x values (0-based) for the wildlife labels needed on the
  // plot for bloom, fruit, other for each of the plants. If there is a gap in the timing for an event
  // e.g. flowering from Mar-May, then again in Sept-Oct, then this tags both March and Sept to get the
  // labels (labels are placed at the start of each distinct event), using the array [2,8] for the value to the bloom: key
  let plotWildlifeLabelLocations: {
    bloomTime: number[];
    fruitTime: number[];
    otherTime: number[];
  }[] = [];

  // The input is the month name array, which is collapsed so that there aren't any undefined entries for
  // characteristics that are missing for a given month.
  function parseWildlifeArrayForLabels(inputWildlifeArray: string[]): number[] {
    //console.log("In parse wildlife array");
    //console.log(inputWildlifeArray);
    let flagHolder = [];
    // Initialize to a flag value (normal range: 0-11)
    let prevMonthIndex = -1;
    for (let index = 0; index < inputWildlifeArray.length; index++) {
      // For the current month, look up the index value of that month. (range 0-11)
      let currMonthIndex = monthLabels.indexOf(inputWildlifeArray[index]);
      //console.log({ currMonthIndex });
      // If it's the first entry and that's not undefined (which is the placeholder I use when the month shouldn't be plotted)
      if (index === 0 && currMonthIndex === 0) {
        flagHolder.push(currMonthIndex);
        prevMonthIndex = currMonthIndex;
        continue;
      }

      //console.log({ prevMonthIndex });
      if (prevMonthIndex !== currMonthIndex - 1) {
        flagHolder.push(currMonthIndex);
      }
      prevMonthIndex = currMonthIndex;
    }
    return flagHolder;
  }

  function generatePlotWildlifeLabelLocations(inputPlant: PlantsType) {
    const plantCharacteristicsToPlot = determinePlantCharsToPlot(inputPlant);
    //console.log({ plantCharacteristicsToPlot });
    let tempPlotWildlifeLabelLocations: {
      bloomTime: number[];
      fruitTime: number[];
      otherTime: number[];
    } = Object(null);

    for (
      let plantCharIndex = 0;
      plantCharIndex < plantCharacteristicsToPlot.length;
      plantCharIndex++
    ) {
      // This is one of 'bloomTime', 'fruitTime', or 'otherTime'
      let currentPlantChar = plantCharacteristicsToPlot[plantCharIndex];
      //console.log({ currentPlantChar });
      // // need to split off the 'Time' suffix and capitalize the first letter before can use for the wildlife lookup
      // let splitPlantChar = currentPlantChar.split("Time")[0]
      // // Will be one of 'Bloom', 'Fruit', or 'Other'
      // let parsedPlantChar = splitPlantChar[0].toUpperCase() + splitPlantChar.slice(1);
      // // use keyof to assert that this will match one of the keys of in the inputPlant object (with type PlantsType)
      // let parsedPlantLookup = `wildlifeAttracted${parsedPlantChar}` as keyof PlantsType;

      // Need to tell TS that the plantEvent is limited to being a PlantsType key, and the indexing
      // operation will return ONLY a BloomFruitTimeObj (not the other types associated with
      // different keys in PlantsType).
      let currPlantCharObj = inputPlant[
        currentPlantChar as keyof PlantsType
      ] as BloomFruitTimeObj;
      //console.log("currentPlantChar");
      //console.log({ currentPlantChar });
      let labelXAxisLocArray = parseWildlifeArrayForLabels(
        // These are the month names
        Object.values(currPlantCharObj)
      );
      //console.log("x axis loc array");
      //console.log(labelXAxisLocArray);

      // Assign array to the correct event type key in the temp holder object
      tempPlotWildlifeLabelLocations[
        currentPlantChar as keyof typeof tempPlotWildlifeLabelLocations
      ] = labelXAxisLocArray;
    }
    //console.log("Temp labels are");
    //console.log(tempPlotWildlifeLabelLocations);
    return tempPlotWildlifeLabelLocations;
  }

  function createDatasets() {
    let datasetArray = [];

    for (let plantIndex = 0; plantIndex < inputPlants.length; plantIndex++) {
      let currPlant = inputPlants[plantIndex];
      let currPlantDataArray = createSinglePlantData(currPlant, plantIndex);
      let wildlifeLabelLocations =
        generatePlotWildlifeLabelLocations(currPlant);
      //console.log("wildlife label locations");
      //console.log(wildlifeLabelLocations);
      plotWildlifeLabelLocations.push(wildlifeLabelLocations);
      // Need to unpack array of objects and add each to the cumulative array to plot
      for (let plantPlotData of currPlantDataArray) {
        datasetArray.push(plantPlotData);
      }
    }
    return datasetArray;
  }

  const plottingData = createDatasets();

  //console.log("wildlife label locations holder is:");
  //console.log(plotWildlifeLabelLocations);

  const dataToGraph = {
    labels: monthLabels,
    datasets: plottingData,
  };

  let bloomArray: number[] = [];
  let fruitArray: number[] = [];
  let otherArray: number[] = [];
  let minMaxYPerPlantArray: { min: number; max: number }[] = [];

  // length of the yTickArray is the same as the number of plants to plot
  for (let typeObj of yTickArray) {
    bloomArray.push(typeObj.bloom);
    fruitArray.push(typeObj.fruit);
    otherArray.push(typeObj.other);
    minMaxYPerPlantArray.push({ min: typeObj.other, max: typeObj.bloom });
  }
  // combined array needed in order to filter the ticks to just include those represented in this array
  const combinedArray = bloomArray.concat(fruitArray).concat(otherArray);

  function buildAnnotationObjects(
    minMaxYPerPlantArray: { min: number; max: number }[],
    numPlants: number
  ) {
    let holderObj: { [key: string]: {} } = {};
    for (let index = 0; index < minMaxYPerPlantArray.length; index++) {
      let plantBoxObj = {};
      let bloomWildlifeObj = {},
        fruitWildlifeObj = {},
        otherWildlifeObj = {};
      let plotWildlifeLabelObj = plotWildlifeLabelLocations[index];
      let plotWildlifeLocations_bloom = plotWildlifeLabelObj.bloomTime;
      //console.log({ plotWildlifeLocations_bloom });
      //console.log(minMaxYPerPlantArray.length);
      let plotWildlifeLocations_fruit = plotWildlifeLabelObj.fruitTime;
      let plotWildlifeLocations_other = plotWildlifeLabelObj.otherTime;
      let currMin = minMaxYPerPlantArray[index].min;
      let currMax = minMaxYPerPlantArray[index].max;
      let currName = plantNameArray[index];
      let currWildlife = plantWildlifeArray[index];
      //console.log({ currWildlife });
      // This is the default plant name label position (above the gray annotation box).
      // Only override if this is the only plant being graphed
      let yLabelPostion = -20;
      if (numPlants === 1) {
        // Override default position to place the plant name at the top of the gray annotation box
        // if it's the only plant being plotted, because otherwise the label is invisible (off the graph's canvas)
        yLabelPostion = 0;
      }
      plantBoxObj = {
        type: "box",
        label: {
          content: currName,
          display: true,
          position: { x: "center", y: "start" },
          yAdjust: yLabelPostion,
        },
        xMin: 0,
        xMax: 13,
        yMin: currMin - 0.1,
        yMax: currMax + 0.1,
        backgroundColor: "rgba(200,200,200,0.4)",
        borderColor: "rgba(220,220,220,0.6)",
        yScaleID: "y",
        xScaleID: "x",
        // This draws the rectangle first, behind the lines (the z parameter for drawing order
        // doesn't seem to work, so use this instead.)
        drawTime: "beforeDatasetsDraw",
      };

      // Return 1 label object (with unique id key in the holderObj)
      // for each of the bloom, fruit, and other label x locations, which
      // are placed at the left end of each disjunct line segment in their graphs.
      if (
        plotWildlifeLocations_bloom !== undefined &&
        plotWildlifeLocations_bloom.length > 0
      ) {
        for (
          let bloomIndex = 0;
          bloomIndex < plotWildlifeLocations_bloom.length;
          bloomIndex++
        ) {
          let currXLocation = plotWildlifeLocations_bloom[bloomIndex];
          bloomWildlifeObj = {
            type: "label",
            xValue: currXLocation,
            yValue: minMaxYPerPlantArray[index].max + 0.03,
            content: currWildlife.bloom.join(", "),
            position: { x: "start", y: "center" },
          };
          // Generate a dynamic, combination label index value to make
          // each added object have a unique key in the object. These keys aren't
          // currently used for any referencing, but need to be unique.
          holderObj[`bloomLabel${index}-${bloomIndex}`] = bloomWildlifeObj;
        }
      }
      // bloomWildlifeObj = {
      //   type: "label",
      //   xValue: 0.1,
      //   yValue: minMaxYPerPlantArray[index].max + 0.03,
      //   content: currWildlife.bloom.join(", "),
      //   position: { x: "start", y: "center" },
      // };
      if (
        plotWildlifeLocations_fruit !== undefined &&
        plotWildlifeLocations_fruit.length > 0
      ) {
        for (
          let fruitIndex = 0;
          fruitIndex < plotWildlifeLocations_fruit.length;
          fruitIndex++
        ) {
          let currXLocation = plotWildlifeLocations_fruit[fruitIndex];
          fruitWildlifeObj = {
            type: "label",
            xValue: currXLocation,
            yValue:
              (minMaxYPerPlantArray[index].max -
                minMaxYPerPlantArray[index].min) /
                2 +
              minMaxYPerPlantArray[index].min +
              0.03,
            content: currWildlife.fruit.join(", "),
            position: { x: "start", y: "center" },
          };
          holderObj[`fruitLabel${index}-${fruitIndex}`] = fruitWildlifeObj;
        }
      }

      if (
        plotWildlifeLocations_other !== undefined &&
        plotWildlifeLocations_other.length > 0
      ) {
        for (
          let otherIndex = 0;
          otherIndex < plotWildlifeLocations_other.length;
          otherIndex++
        ) {
          let currXLocation = plotWildlifeLocations_other[otherIndex];
          otherWildlifeObj = {
            type: "label",
            xValue: currXLocation,
            yValue: minMaxYPerPlantArray[index].min + 0.03,
            content: currWildlife.other.join(", "),
            position: { x: "start", y: "center" },
          };
          holderObj[`otherLabel${index}-${otherIndex}`] = otherWildlifeObj;
        }
      }
      // fruitWildlifeObj = {
      //   type: "label",
      //   xValue: 0.1,
      //   yValue:
      //     (minMaxYPerPlantArray[index].max - minMaxYPerPlantArray[index].min) /
      //       2 +
      //     minMaxYPerPlantArray[index].min +
      //     0.03,
      //   content: currWildlife.fruit.join(", "),
      //   position: { x: "start", y: "center" },
      // };
      // otherWildlifeObj = {
      //   type: "label",
      //   xValue: 0.1,
      //   yValue: minMaxYPerPlantArray[index].min + 0.03,
      //   content: currWildlife.other.join(", "),
      //   position: { x: "start", y: "center" },
      // };
      holderObj[`box${index}`] = plantBoxObj;
      // These MUST remain commented out, otherwise they're the cause of the
      // diagonal gray line rendering when not all 3 wildlife features are specified for each plant.
      //holderObj[`bloomLabel${index}`] = bloomWildlifeObj;
      //holderObj[`fruitLabel${index}`] = fruitWildlifeObj;
      // holderObj[`otherLabel${index}`] = otherWildlifeObj;
    }
    //console.log("The options holder is:");
    //console.log(holderObj);
    return holderObj;
  }

  //console.log({ minMaxYPerPlantArray });
  // Pass the number of plants in as an arg to allow the plant name annotation to remain easily visible regardless of how many plants are rendered
  // (it has to render inside the annotation rectangle to be visible with a single rendered plant, then outside of it for > 1 plant to not
  // overlap with the wildlife strings)
  const annotationObject = buildAnnotationObjects(
    minMaxYPerPlantArray,
    inputPlants.length
  );

  // I was getting lots of type errors when setting the ticks callback - it's supposed to be a fancy
  // intersection type combining lots of different subtypes for the Line component, but was very hard
  // for me to understand what was missing and needed to be typed differently, so I'm making plottingOptions
  // an 'any' type to avoid the type errors and to continue on. I realize this isn't the best,
  // but it's the only way I could clear this error for now.
  const plottingOptions: any = {
    plugins: {
      // Removing the legend entries (now redundant with the plant name and plant event type annotations on the plot)
      legend: {
        display: false,
      },
      annotation: {
        annotations: annotationObject,
        // annotations: {
        //   box1: {
        //     type: "box",
        //     label: {
        //       content: "Testing Gussy",
        //       display: true,
        //       position: { x: "center", y: "start" },
        //       yAdjust: -30,
        //     },
        //     xMin: 1,
        //     xMax: 13,
        //     yMin: 0.8,
        //     yMax: 0.9,
        //     backgroundColor: "rgba(200,200,200,0.4)",
        //     borderColor: "rgba(220,220,220,0.6)",
        //     yScaleID: "y",
        //     xScaleID: "x",
        //     // This draws the rectangle first, behind the lines (the z parameter for drawing order
        //     // doesn't seem to work, so use this instead.)
        //     drawTime: "beforeDatasetsDraw",
        //   },
        // },
      },
    },
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

  //console.log("Data to graph is:");
  //console.log(dataToGraph);
  //return <></>;
  return <Line options={plottingOptions} data={dataToGraph} />;
}
