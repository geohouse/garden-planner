const canvasElement = document.querySelector("canvas");
const ctx = canvasElement.getContext("2d");

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

const testChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: monthLabels,
    datasets: [
      {
        label: "Marigold_bloom",
        data: [
          undefined,
          undefined,
          undefined,
          undefined,
          1,
          1,
          1,
          1,
          1,
          1,
          undefined,
          undefined,
        ],
        borderColor: "#aa9900",
        backgroundColor: "#aa9900",
      },
      {
        label: "Marigold_fruit",
        data: [
          undefined,
          undefined,
          undefined,
          undefined,
          0.8,
          0.8,
          0.8,
          0.8,
          0.8,
          0.8,
          undefined,
          undefined,
        ],
        borderColor: "#aa0099",
        backgroundColor: "#aa0099",
      },
    ],
  },
  options: {
    scales: {
      y: {
        min: 0,
        max: 5,
      },
    },
  },
});
