export default function NewPlant() {
  return (
    <>
      <form id="new-plant-form">
        <div>
          <label for="plant-name">Plant name</label>
          <input
            type="text"
            id="plant-name"
            placeholder="What is the name of the plant?"
            size="60"
          >
            {/* This is an approximate text entry size (won't be exactly this many characters long based on font settings*/}
          </input>
        </div>
        <div>
          {/* Will need to make a better month selector myself because
        Firefox and Safari both don't support ticks and tick numbers for sliders
        and I want something users can paint over for selection instead of the fiddly month selector*/}
          <label for="bloom-time">Bloom time</label>
          <input id="bloom-time" type="range" min="1" max="12" step="1"></input>
        </div>
        <div>
          <label for="bloom-color">Bloom color</label>
          <input id="bloom-color" type="color" value="#E66465"></input>
        </div>
        <div>
          <p>Attracts</p>
          <label for="attracts-bees">Bees?</label>
          <input id="attracts-bees" type="checkbox"></input>
          <label for="attracts-butterflies">Butterflies?</label>
          <input id="attracts-butterflies" type="checkbox"></input>
          <label for="attracts-hummingbirds">Hummingbirds?</label>
          <input id="attracts-hummingbirds" type="checkbox"></input>
        </div>
        <input type="submit" value="Add plant to list"></input>
      </form>
      <h1>Garden planner in progress</h1>
    </>
  );
}
