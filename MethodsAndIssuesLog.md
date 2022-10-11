
JestDOM, used for testing, does not support `resize-observer`, which the `Chart` library uses. Tried multiple possible solutions from related GitHub and Stack Overflow posts. Ended up using a polyfill to allow testing of the full app with the plot from Chart enabled.

Solution used from here
https://github.com/ZeeCoder/use-resize-observer/issues/40

Other possibilities tried
https://stackoverflow.com/questions/64558062/how-to-mock-resizeobserver-to-work-in-unit-tests-using-react-testing-library

Using Jest tests helped with improving html accessibility through specifying [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles) ([to allow `getByRole` recommended queries](https://testing-library.com/docs/queries/about/)) and ARIA labels to assign accessible names to elements so that they can be searched/filtered by their `aria-label` attributes using the `name` query option

useState and useEffect in the color picker to keep track of current color and highlight the newly selected color on each new color click. Pass setBloomColor function for setting main app state down to the color selector to set the color. Used an object of color names(keys) color hex codes (values) to compactly allow making the color selector buttons with correct labels and get the right color for them, then settin the correct hex bloomColor for use in the list/graph and styling the selected button based on the color name.

Made 'paint over' effect in the date picker buttons by selecting on mouse down over the button, or on mouse over if the left button was clicked at that time. Used mock functions in jest to stand-in as the expected props passed to components. Some state tests were running faster than the logic code to determine state updates was running/rendering. Used `setTimeout()` with `jest.useFakeTimers()` to give a slight delay to allow the test to run only after the expected update had taken place. This is a signal that re-factoring will be useful.

Migrating to TypeScript using separate branch. Realized that even with TS strict mode, can dismiss the (current) compile errors while fixing when using `npm run` and still get the app with its current function 'behind' that gray window showing the errors. Need to change the import statements to not include `.js` extensions, otherwise will fail. If get error about the module not being loadable even though the path is correct, may need to use Intellisense in VSCode to help: delete path back to `./` then select the name of the module (will show up as .tsx in the list) for import - when it enters the selection into the code, it will remove the .tsx extension and the import then seems to work correctly. The tests with Jest using the `.test.js` file also work out of the box in the same was as long as the imports at the top of that file also have the `.js` extension removed.

Generalized the `BloomDateSelect` component to be `DateSelect` instead to render date selectors for bloom time, fruiting time, and any other time where the plant is attracting wildlife. This now includes another prop to the component to tell it which event type it's currently rendering for - this is used in making the class/id names for the date selector so that the buttons for e.g. blooming are fully targetable separately from the buttons for the other events.

Using `keyof` to resolve type errors when using square bracket notation with a string variable to index into a typed object (to tell TS this string should match one of the defined key types of the object) and `keyof typeof` to resolve type errors with square bracket indexing into an object that isn't a TS interface and doesn't have explicit index signatures for keys set on it.

When needing to create data objects/arrays for plotting multiple line segments for each of the plants (bloom, fruiting, other), re-factoring as needed to use the most efficient way to loop through the input data to create the needed output format - `map` or `for` loops.

Importing type from Chart.js (`Tick[]`) to enable correct typing and autocompletion of tick values created manually using a callback function and a type `Tick[]` array of objects.

Getting experience working with nested objects that contain multiple types and they need to be dynamically indexed by a variable. Use `as` characterizer to limit the type to be a key of a type in order to allow dynamic look-up, then use `as` to specify that the returned value is another specific type that will have other properties that need to be called (statically) 
e.g. 
```let test = inputPlant[currentPlantChar as keyof PlantsType] as BloomFruitTimeObj;```
Where `currentPlantChar` is dynamic

To build the app for deployment to GH pages - 
1. Updated the `build` command in `package.json` to be building for TypeScript first then building the resulting .jsx files with Webpack with `tsc --build && react-scripts build`
2. Added `homepage` key to `package.json` with value of the target main page: `https://geohouse.github.io/garden-planner/`. This makes all links start with that correct prefix so the files can be found correctly when served on GitHub.
3. Run `npm run build` from PowerShell
4. Switch to `gh-pages` branch, where the page is served. Have this as a different branch because the site is served from the root after (currently) manually moving files, and don't want that to clutter/confuse the main branch.
5. Make copy of all contents in resulting `build` folder and paste them into the root of the folder
