
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
