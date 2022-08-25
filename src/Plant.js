export default function Plant(props) {
  // Get the wildlife attracted list (wildlife keys where the value is true)
  // for use in rendering below. Easier to process this here, then pass it to the renderer.
  let wildlifeAttractedArray = [];
  for (const wildlifeTypeKey in props.plantInfo.wildlifeAttracted) {
    if (props.plantInfo.wildlifeAttracted[wildlifeTypeKey]) {
      wildlifeAttractedArray.push(wildlifeTypeKey);
    }
  }
  const wildlifeAttractedString = wildlifeAttractedArray.join(", ");

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
          <div role="listitem" className="bloom-months">
            {props.plantInfo.bloomTime.monthNameArray.map((month, index) => {
              return <p key={index}>{month}</p>;
            })}
          </div>
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
