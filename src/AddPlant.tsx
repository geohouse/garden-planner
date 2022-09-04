import ColorBlocks from "./ColorBlocks";
import DateSelect from "./DateSelect";
import { BloomTime, DateSelectionObj } from "./GardenPlannerInterfaces";
// Will need to re-factor these into their own file to be
// able to import and use the interfaces in the
// main GardenPlanner app and also here.
// interface BloomTime {
//   monthNumAsStringArray: string[];
//   monthNameArray: string[];
// }

// // interfaces are only used for object types. `type` can be used to alias the type
// // for other features e.g. functions.
// //type BloomColorChange = (hexColor: string, colorName: string) => void;

// // This accomodates the keys being 1-12 (or any number) without any hardcoding.
// // Could make more specific to only allow 1-12 and that would also be OK.
// interface BloomTimeObj {
//   [key: number]: string;
// }

// need to take any string as a key
// instead of the default Union of 'bees'|'butterflies'|'hummingbirds'
// because later in the code there is a wildlife type string used as a key index into the object
// and this fails unless the key type is the generic string.
// interface WildlifeAttracted {
//   bees: boolean;
//   butterflies: boolean;
//   hummingbirds: boolean;
// }

interface AddPlantsProps {
  plantName: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bloomTime: BloomTime;
  onBloomTimeChange: (selectedMonthObj: DateSelectionObj) => void;
  onFruitTimeChange: (selectedMonthObj: DateSelectionObj) => void;
  onBloomColorChange: (hexColor: string, colorName: string) => void;
  wildlifeAttracted: { [key: string]: boolean };
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
        <label htmlFor="bloom-date-holder">
          Bloom duration (supports click and drag to quickly 'paint' over
          multiple months)
        </label>
        <div id="bloom-date-holder">
          <DateSelect
            onDateSelectChange={props.onBloomTimeChange}
            eventTypeForDate="bloom"
          />
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
        <label htmlFor="fruit-date-holder">
          Fruit or seed duration (supports click and drag to quickly 'paint'
          over multiple months)
        </label>
        <div id="fruit-date-holder">
          <DateSelect
            onDateSelectChange={props.onFruitTimeChange}
            eventTypeForDate="fruit"
          />
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
          <label htmlFor="attracts-songbirds">Songbirds?</label>
          <input
            id="attracts-songbirds"
            type="checkbox"
            checked={props.wildlifeAttracted.songbirds}
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
