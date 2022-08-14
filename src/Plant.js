export default function Plant(props) {
  return (
    <>
      <div className="plant">
        <p className="plant-name">{props.plantInfo.plantName}</p>
        <div className="bloom-features"></div>
      </div>
    </>
  );
}
