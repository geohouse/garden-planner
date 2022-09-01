import ColorBlocks from "./ColorBlocks";
import BloomDateSelect from "./BloomDateSelect";

// Will need to re-factor these into their own file to be
// able to import and use the interfaces in the
// main GardenPlanner app and also here.
interface BloomTime {
  monthNameAsStringArray: string[];
  monthNameArray: string[];
}

// This accomodates the keys being 1-12 (or any number) without any hardcoding.
// Could make more specific to only allow 1-12 and that would also be OK.
interface BloomTimeObj {
  [key: number]: string;
}

interface WildlifeAttracted {
  bees: boolean;
  butterflies: boolean;
  hummingbirds: boolean;
}

interface AddPlantsProps {
  plantName: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bloomTime: BloomTime;
  onBloomTimeChange: (selectedMonthObj: BloomTimeObj) => void;
  onBloomColorChange: (hexColor: string, colorName: string) => void;
  wildlifeAttracted: WildlifeAttracted;
  onWildlifeAttractedChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onPlantSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddPlant(props: AddPlantsProps) {
  return (
    <>
      <form id="new-plant-form" onSubmit={props.onPlantSubmit}>
        <div>
          <label htmlFor="plant-name">Plant name</label>
          <input
            type="text"
            id="plant-name"
            placeholder="What is the name of the plant?"
            size={60}
            value={props.plantName}
            onChange={props.onNameChange}
          >
            {/* This is an approximate text entry size (won't be exactly this many characters long based on font settings*/}
          </input>
        </div>
        <label htmlFor="bloom-date-holder">
          Bloom duration (supports click and drag to quickly 'paint' over
          multiple months)
        </label>
        <div id="bloom-date-holder">
          <BloomDateSelect onBloomTimeChange={props.onBloomTimeChange} />
          {/* Will need to make a better month selector myself because
        Firefox and Safari both don't support ticks and tick numbers for sliders
        and I want something users can paint over for selection instead of the fiddly month selector*/}
          {/* <label htmlFor="bloom-time">Bloom time</label>
          <input
            id="bloom-time"
            type="range"
            min="1"
            max="12"
            step="1"
            value={props.bloomTime.monthNumAsString}
            onChange={props.onBloomTimeChange}
          ></input> */}
        </div>
        <label htmlFor="color-block-holder">Bloom color</label>
        <div id="color-block-holder">
          <ColorBlocks onBloomColorChange={props.onBloomColorChange} />
          {/* <input
            id="bloom-color"
            type="color"
            value={props.bloomColor}
            onChange={props.onBloomColorChange}
          ></input> */}
        </div>
        <div>
          <p id="attracted-wildlife">Attracts</p>
          <label htmlFor="attracts-bees">Bees?</label>
          <input
            id="attracts-bees"
            type="checkbox"
            checked={props.wildlifeAttracted.bees}
            onChange={props.onWildlifeAttractedChange}
          ></input>
          <label htmlFor="attracts-butterflies">Butterflies?</label>
          <input
            id="attracts-butterflies"
            type="checkbox"
            checked={props.wildlifeAttracted.butterflies}
            onChange={props.onWildlifeAttractedChange}
          ></input>
          <label htmlFor="attracts-hummingbirds">Hummingbirds?</label>
          <input
            id="attracts-hummingbirds"
            type="checkbox"
            checked={props.wildlifeAttracted.hummingbirds}
            onChange={props.onWildlifeAttractedChange}
          ></input>
        </div>
        <label htmlFor="add-plant-to-plan">Add plant to the garden plan?</label>
        <input id="add-plant-to-plan" type="submit" value="Add plant"></input>
      </form>
      <h1>Garden planner in progress</h1>
    </>
  );
}
