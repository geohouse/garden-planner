import React from "react";
import ColorBlocks from "./ColorBlocks";
import DateSelect from "./DateSelect";
import { BloomFruitTimeObj, DateSelectionObj } from "./GardenPlannerInterfaces";
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
  bloomColorName: string;
  bloomTime: BloomFruitTimeObj;
  fruitTime: BloomFruitTimeObj;
  otherTime: BloomFruitTimeObj;
  onBloomTimeChange: (selectedMonthObj: DateSelectionObj) => void;
  onFruitTimeChange: (selectedMonthObj: DateSelectionObj) => void;
  onOtherTimeChange: (selectedMonthObj: DateSelectionObj) => void;
  onBloomColorChange: (hexColor: string, colorName: string) => void;
  wildlifeAttractedBloom: { [key: string]: boolean };
  wildlifeAttractedFruit: { [key: string]: boolean };
  wildlifeAttractedOther: { [key: string]: boolean };
  onWildlifeAttractedChangeBloom: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onWildlifeAttractedChangeFruit: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onWildlifeAttractedChangeOther: (
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
            // auto-focus the plant name to allow easy start to entering a new plant
            autoFocus
            value={props.plantName}
            onChange={props.onNameChange}
          >
            {/* This is an approximate text entry size (won't be exactly this many characters long based on font settings*/}
          </input>
        </div>
        <label htmlFor="color-block-holder">Bloom color</label>
        <div id="color-block-holder">
          <ColorBlocks
            onBloomColorChange={props.onBloomColorChange}
            bloomColorName={props.bloomColorName}
          />
          {/* <input
            id="bloom-color"
            type="color"
            value={props.bloomColor}
            onChange={props.onBloomColorChange}
          ></input> */}
        </div>

        <p id="date-select-heading">
          Date selectors (all support clicking and dragging to quickly 'paint'
          over multiple months)
        </p>
        <div id="date-selectors">
          <div id="bloom-date-holder">
            <p id="bloom-date-holder-label">Bloom duration</p>
            <DateSelect
              onDateSelectChange={props.onBloomTimeChange}
              eventTypeForDate="bloom"
              eventTypeValue={props.bloomTime}
              // dateStateForEventType={props.bloomTime}
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
            <div id="bloom-attracted-wildlife-div">
              <p id="bloom-attracted-wildlife">Attracts</p>
              <label htmlFor="bloom-attracts-bees">Bees?</label>
              <input
                id="bloom-attracts-bees"
                type="checkbox"
                checked={props.wildlifeAttractedBloom.bees}
                onChange={props.onWildlifeAttractedChangeBloom}
              ></input>
              <label htmlFor="bloom-attracts-butterflies">Butterflies?</label>
              <input
                id="bloom-attracts-butterflies"
                type="checkbox"
                checked={props.wildlifeAttractedBloom.butterflies}
                onChange={props.onWildlifeAttractedChangeBloom}
              ></input>
              <label htmlFor="bloom-attracts-hummingbirds">Hummingbirds?</label>
              <input
                id="bloom-attracts-hummingbirds"
                type="checkbox"
                checked={props.wildlifeAttractedBloom.hummingbirds}
                onChange={props.onWildlifeAttractedChangeBloom}
              ></input>
              <label htmlFor="bloom-attracts-songbirds">Songbirds?</label>
              <input
                id="bloom-attracts-songbirds"
                type="checkbox"
                checked={props.wildlifeAttractedBloom.songbirds}
                onChange={props.onWildlifeAttractedChangeBloom}
              ></input>
              <label htmlFor="bloom-attracts-other">Other?</label>
              <input
                id="bloom-attracts-other"
                type="checkbox"
                checked={props.wildlifeAttractedBloom.other}
                onChange={props.onWildlifeAttractedChangeBloom}
              ></input>
            </div>
          </div>

          <div id="fruit-date-holder">
            <p id="fruit-date-holder-label">Fruit or seed duration</p>
            <DateSelect
              onDateSelectChange={props.onFruitTimeChange}
              eventTypeForDate="fruit"
              eventTypeValue={props.fruitTime}
              // dateStateForEventType={props.fruitTime}
            />
            <div id="fruit-attracted-wildlife-div">
              <p id="fruit-attracted-wildlife">Attracts</p>
              <label htmlFor="fruit-attracts-songbirds">Songbirds?</label>
              <input
                id="fruit-attracts-songbirds"
                type="checkbox"
                checked={props.wildlifeAttractedFruit.songbirds}
                onChange={props.onWildlifeAttractedChangeFruit}
              ></input>
              <label htmlFor="fruit-attracts-mammals">Mammals?</label>
              <input
                id="fruit-attracts-mammals"
                type="checkbox"
                checked={props.wildlifeAttractedFruit.mammals}
                onChange={props.onWildlifeAttractedChangeFruit}
              ></input>
              <label htmlFor="fruit-attracts-other">Other?</label>
              <input
                id="fruit-attracts-other"
                type="checkbox"
                checked={props.wildlifeAttractedFruit.other}
                onChange={props.onWildlifeAttractedChangeFruit}
              ></input>
            </div>
          </div>

          <div id="other-date-holder">
            <p id="other-date-holder-label">
              Other attractions for wildlife (e.g. leaves or bark)
            </p>
            <DateSelect
              onDateSelectChange={props.onOtherTimeChange}
              eventTypeForDate="other"
              eventTypeValue={props.otherTime}
              // dateStateForEventType={props.otherTime}
            />
            <div id="other-attracted-wildlife-div">
              <p id="other-attracted-wildlife">Attracts</p>
              <label htmlFor="other-attracts-bees">Bees?</label>
              <input
                id="other-attracts-bees"
                type="checkbox"
                checked={props.wildlifeAttractedOther.bees}
                onChange={props.onWildlifeAttractedChangeOther}
              ></input>
              <label htmlFor="other-attracts-butterflies">Butterflies?</label>
              <input
                id="other-attracts-butterflies"
                type="checkbox"
                checked={props.wildlifeAttractedOther.butterflies}
                onChange={props.onWildlifeAttractedChangeOther}
              ></input>
              <label htmlFor="other-attracts-hummingbirds">Hummingbirds?</label>
              <input
                id="other-attracts-hummingbirds"
                type="checkbox"
                checked={props.wildlifeAttractedOther.hummingbirds}
                onChange={props.onWildlifeAttractedChangeOther}
              ></input>
              <label htmlFor="other-attracts-songbirds">Songbirds?</label>
              <input
                id="other-attracts-songbirds"
                type="checkbox"
                checked={props.wildlifeAttractedOther.songbirds}
                onChange={props.onWildlifeAttractedChangeOther}
              ></input>
              <label htmlFor="other-attracts-mammals">Mammals?</label>
              <input
                id="other-attracts-mammals"
                type="checkbox"
                checked={props.wildlifeAttractedOther.mammals}
                onChange={props.onWildlifeAttractedChangeOther}
              ></input>
              <label htmlFor="other-attracts-other">Other?</label>
              <input
                id="other-attracts-other"
                type="checkbox"
                checked={props.wildlifeAttractedOther.other}
                onChange={props.onWildlifeAttractedChangeOther}
              ></input>
            </div>
          </div>
        </div>
        <div id="add-plant">
          <label htmlFor="add-plant-to-plan">
            Add plant to the garden plan?
          </label>
          <input id="add-plant-to-plan" type="submit" value="Add plant"></input>
        </div>
      </form>

      {/* <h1>Garden planner in progress</h1> */}
    </>
  );
}
