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
  // Filter to include only the wildlife types that are attracted by
  // bloom, fruit, other (have true entries)
  function prepWildlifeListsForDisplay() {
    let wildlifeAttractedBloom = Object.keys(
      props.plantInfo.wildlifeAttractedBloom
    ).filter((wildlifeType, index) => {
      if (Object.values(props.plantInfo.wildlifeAttractedBloom)[index]) {
        return wildlifeType;
      }
      return null;
    });
    let wildlifeAttractedFruit = Object.keys(
      props.plantInfo.wildlifeAttractedFruit
    ).filter((wildlifeType, index) => {
      if (Object.values(props.plantInfo.wildlifeAttractedFruit)[index]) {
        return wildlifeType;
      }
      return null;
    });
    let wildlifeAttractedOther = Object.keys(
      props.plantInfo.wildlifeAttractedOther
    ).filter((wildlifeType, index) => {
      if (Object.values(props.plantInfo.wildlifeAttractedOther)[index]) {
        return wildlifeType;
      }
      return null;
    });

    // Get the wildlife attracted list (wildlife keys where the value is true)
    // for use in rendering below. Easier to process this here, then pass it to the renderer.
    // Tried re-factoring into a single function for all 3 wildlife attraction types, but
    // couldn't get it to work with passing the dynamic (and nested) types needed, so
    // am doing this instead.
    //Bloom
    // for (let wildlifeTypeKey in props.plantInfo.wildlifeAttractedBloom) {
    //   // For wildlife entries that have a true value, add to holder array
    //   let currWildlifeEntry =
    //     props.plantInfo.wildlifeAttractedBloom[
    //       wildlifeTypeKey as keyof WildlifeAttractedBloomType
    //     ];
    //   if (currWildlifeEntry) {
    //     wildlifeListObj.wildlifeAttractedBloom.push(wildlifeTypeKey);
    //   }
    // }
    // // Fruit
    // for (let wildlifeTypeKey in props.plantInfo.wildlifeAttractedFruit) {
    //   // For wildlife entries that have a true value, add to holder array
    //   let currWildlifeEntry =
    //     props.plantInfo.wildlifeAttractedFruit[
    //       wildlifeTypeKey as keyof WildlifeAttractedFruitType
    //     ];
    //   if (currWildlifeEntry) {
    //     wildlifeListObj.wildlifeAttractedFruit.push(wildlifeTypeKey);
    //   }
    // }

    // // Other
    // for (let wildlifeTypeKey in props.plantInfo.wildlifeAttractedOther) {
    //   // For wildlife entries that have a true value, add to holder array
    //   let currWildlifeEntry =
    //     props.plantInfo.wildlifeAttractedOther[
    //       wildlifeTypeKey as keyof WildlifeAttractedOtherType
    //     ];
    //   if (currWildlifeEntry) {
    //     wildlifeListObj.wildlifeAttractedOther.push(wildlifeTypeKey);
    //   }
    // }

    const wildlifeListObj = {
      wildlifeAttractedBloom,
      wildlifeAttractedFruit,
      wildlifeAttractedOther,
    };
    return wildlifeListObj;
  }
  const {
    wildlifeAttractedBloom,
    wildlifeAttractedFruit,
    wildlifeAttractedOther,
  } = prepWildlifeListsForDisplay();

  const monthsFirstLetter = [
    "J",
    "F",
    "M",
    "A",
    "M",
    "J",
    "J",
    "A",
    "S",
    "O",
    "N",
    "D",
  ];

  // Convert from string array to numeric to allow matching by index with monthsFirstLetter array to render
  // month diagram in plant card.
  let bloomMonthsNumeric = props.plantInfo.bloomTime.monthNumAsStringArray.map(
    (monthString) => Number.parseInt(monthString, 10)
  );

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
          <div className="plant-card-blooming">
            <p>Blooming months</p>
            <div className="plant-card-bloom-months">
              {monthsFirstLetter.map((monthLetter, index) => {
                const blockStyle = {
                  backgroundColor: "white",
                };
                // loop through all months; if the current month is one of the blooming months
                // (matched by index), then set the background for that month's box in the plant
                // card bloom section to be the bloom color.
                if (bloomMonthsNumeric.includes(index + 1)) {
                  blockStyle.backgroundColor = props.plantInfo.bloomColor;
                }
                return <div style={blockStyle}>{monthLetter}</div>;
              })}
            </div>

            <p>Attracts:</p>
            <ul className="bloom-months-wildlife">
              {wildlifeAttractedBloom.map((entry) => {
                return (
                  <li key={entry}>{entry[0].toUpperCase() + entry.slice(1)}</li>
                );
              })}
            </ul>
          </div>
          <div className="plant-card-fruiting">
            <p>Fruiting months</p>
            <ul className="fruit-months">
              {props.plantInfo.fruitTime.monthNameArray.map((month, index) => {
                return <li key={index}>{month}</li>;
              })}
            </ul>
            <p>Attracts:</p>
            <ul className="fruit-months-wildlife">
              {wildlifeAttractedFruit.map((entry) => {
                return (
                  <li key={entry}>{entry[0].toUpperCase() + entry.slice(1)}</li>
                );
              })}
            </ul>
          </div>
          <div className="plant-card-other">
            <p>Other months</p>
            <ul className="other-months">
              {props.plantInfo.otherTime.monthNameArray.map((month, index) => {
                return <li key={index}>{month}</li>;
              })}
            </ul>
            <p>Attracts:</p>
            <ul className="other-months-wildlife">
              {wildlifeAttractedOther.map((entry) => {
                return (
                  <li key={entry}>{entry[0].toUpperCase() + entry.slice(1)}</li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="attract-wildlife">
          <p>Attracts:</p>
          <p
            className="wildlife-attracted"
            role="listitem"
            aria-label="wildlife-attracted"
          >
            {wildlifeAttractedString}}
          </p> 
            </div>*/}
      </div>
    </>
  );
}
