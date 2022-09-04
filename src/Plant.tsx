import { PlantsType } from "./GardenPlannerInterfaces";

// interface BloomTimeObj {
//   [key: number]: string;
// }

// interface PlantsType {
//   id: number;
//   plantName: string;
//   bloomTime: BloomTimeObj;
//   bloomColor: string;
//   bloomColorName: string;
//   wildlifeAttracted: { [key: number]: boolean };
// }

interface PlantProps {
  plantInfo: PlantsType;
}

export default function Plant(props: PlantProps) {
  // Get the wildlife attracted list (wildlife keys where the value is true)
  // for use in rendering below. Easier to process this here, then pass it to the renderer.
  let wildlifeAttractedArray = [];
  for (const wildlifeTypeKey in props.plantInfo.wildlifeAttracted) {
    if (props.plantInfo.wildlifeAttracted[wildlifeTypeKey]) {
      wildlifeAttractedArray.push(wildlifeTypeKey);
    }
  }
  const wildlifeAttractedString = wildlifeAttractedArray.join(", ");

  const bloomMonthNameArray: string[] =
    props.plantInfo.bloomTime.monthNameArray;

  const fruitMonthNameArray: string[] =
    props.plantInfo.fruitTime.monthNameArray;

  console.log(bloomMonthNameArray[1]);
  console.log(fruitMonthNameArray[1]);
  console.log(props.plantInfo.bloomTime.monthNameArray);

  return (
    <>
      <div role="list" className="plant-card">
        <p className="plant-name" role="listitem" aria-label="plant-name">
          {props.plantInfo.plantName}
        </p>
        <div className="bloom-features">
          <p role="listitem">Bloom color</p>
          <div className="bloom-color">
            <p
              role="listitem"
              aria-label="bloom-color-label"
              className="bloom-color-label"
            >
              {props.plantInfo.bloomColorName}
            </p>
            <svg viewBox="0 0 35 35" xmlns="<http://www.w3.org/2000/svg>">
              <rect
                className="bloom-color-svg"
                x="5"
                y="5"
                width="25px"
                height="25px"
                fill={props.plantInfo.bloomColor}
              />
            </svg>
          </div>
          <p>Blooming months</p>
          <ul className="bloom-months">
            {bloomMonthNameArray.map((month, index) => {
              return <li key={index}>{month}</li>;
            })}
          </ul>
          <p>Fruiting months</p>
          <ul className="fruit-months">
            {fruitMonthNameArray.map((month, index) => {
              return <li key={index}>{month}</li>;
            })}
          </ul>
        </div>
        <div className="attract-wildlife">
          <p>Attracts:</p>
          <p
            className="wildlife-attracted"
            role="listitem"
            aria-label="wildlife-attracted"
          >
            {wildlifeAttractedString}
          </p>
        </div>
      </div>
    </>
  );
}
