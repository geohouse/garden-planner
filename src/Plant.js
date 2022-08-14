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
      <div className="plant">
        <p className="plant-name">{props.plantInfo.plantName}</p>
        <div className="bloom-features">
          <p>Bloom color</p>
          <div className="bloom-color">
            <svg viewBox="0 0 25 25" xmlns="<http://www.w3.org/2000/svg>">
              <rect
                x="5"
                y="5"
                width="15px"
                height="15px"
                fill={props.plantInfo.bloomColor}
              />
            </svg>
          </div>
          <div className="bloom-months">
            {props.plantInfo.bloomTime.monthNameArray.map((month) => {
              return <p>{month}</p>;
            })}
          </div>
        </div>
        <div className="attract-wildlife">
          <p>Attracts:</p>
          <p>{wildlifeAttractedString}</p>
        </div>
      </div>
    </>
  );
}
