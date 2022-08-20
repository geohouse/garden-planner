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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PlantPlot(props) {
  const inputPlants = props.inputPlants;
  //console.log("plant plot");
  //console.log(inputPlants);

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

  function createDatasets() {
    const numPlants = inputPlants.length;
    // Initialize a holder array with undefined values (any surviving
    // undefined entries just appear as holes in the graph)
    const templateBloomArray = Array.from({ length: 12 });
    //console.log({ numPlants });
    const datasetsArray = inputPlants.map((plant, plantIndex) => {
      let bloomArray = [...templateBloomArray];
      // Only prep the graph data if there was at least 1 bloom time noted.
      // Otherwise the array to plot will all be undefined values, and nothing will
      // show on the graph.
      if (plant.bloomTime.monthNumAsStringArray.length > 0) {
        //console.log("Firing if");
        plant.bloomTime.monthNumAsStringArray.forEach((bloomTimeEntryStr) => {
          const bloomTimeEntryNum = Number.parseInt(bloomTimeEntryStr, 10);
          // Fill in the graph entry to span the bloom month start and the bloom month end
          // Graph indices are 0-based
          bloomArray[bloomTimeEntryNum - 1] = plantIndex + 1;
          bloomArray[bloomTimeEntryNum] = plantIndex + 1;
          //console.log({ bloomArray });
        });
        //console.log(bloomArray);
      }
      const currPlantForGraph = {
        label: plant.plantName,
        data: bloomArray,
        borderColor: plant.bloomColor,
        backgroundColor: plant.bloomColor,
      };
      return currPlantForGraph;
    });
    return datasetsArray;
  }

  //const tester = createDatasets();
  //console.log("tester");
  //console.log(tester);

  const dataToGraph = {
    labels: monthLabels,
    datasets: createDatasets(),
  };

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

  return <Line data={dataToGraph} />;
}
