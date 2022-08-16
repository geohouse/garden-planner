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
  ];

  function createDatasets() {
    const numPlants = inputPlants.length;
    console.log({ numPlants });
    const datasetsArray = inputPlants.map((plant, index) => {
      const currPlantForGraph = {
        label: plant.plantName,
        data: [index, index, index],
        borderColor: plant.bloomColor,
        backgroundColor: plant.bloomColor,
      };
      return currPlantForGraph;
    });
    return datasetsArray;
  }

  const tester = createDatasets();
  console.log("tester");
  console.log(tester);

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
