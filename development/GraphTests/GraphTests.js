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
      {
        label: "Marigold_other",
        data: [
          undefined,
          0.6,
          0.6,
          0.6,
          0.6,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        borderColor: "#44aadd",
        backgroundColor: "#aaff99",
      },
    ],
  },
  options: {
    scales: {
      y: {
        min: 0,
        max: 5,
        afterBuildTicks: axis => axis.ticks = [0.6,0.8,1.0].map(entry => ({value: entry})),
        ticks: {

          callback: function (value, index, ticks) {
            // ticks is an array of objects with each object having 'value', 'label', and '$context' keys.
            // 'value' is the tick mark value on the axis, and 'label' is the current tick label
            // index is the object number in the ticks array that represents the current value.
            let testType= [
              { bloom: 1.0, fruit: 0.8, other: 0.6 },
            ];
            return value === 1 ? 'bloom' : value === 0.8 ? 'fruit' : 'other'

            // console.log({ value });
            // console.log({ ticks });
            // console.log({ index });
            // for (let typeObj of testType) {
            //   // bloom, fruit, or other
            //   for (let typeKey in typeObj) {
            //     let typeValue = typeObj[typeKey];
            //     console.log({ typeValue });
            //     for (let currTickObject of ticks) {
            //       console.log(currTickObject);
            //       console.log(currTickObject.value === typeValue);
            //       if (currTickObject.value === typeValue) {
            //         currTickObject.label = typeKey;
            //         //return typeKey;
            //       }
            //     }
            //   }
            // }

            // if (index === 3) {
            //   return `${ticks[index].value} blooming test`;
            // }

            // return `*${value}`;
          },
          // callback: function (value, index) {
          //   return `# ${value}`;
          // },
        },
      },
    },
  },
});
