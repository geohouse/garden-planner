
JestDOM, used for testing, does not support `resize-observer`, which the `Chart` library uses. Tried multiple possible solutions from related GitHub and Stack Overflow posts. Ended up using a polyfill to allow testing of the full app with the plot from Chart enabled.

Solution used from here
https://github.com/ZeeCoder/use-resize-observer/issues/40

Other possibilities tried
https://stackoverflow.com/questions/64558062/how-to-mock-resizeobserver-to-work-in-unit-tests-using-react-testing-library

Using Jest tests helped with improving html accessibility through specifying [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles) ([to allow `getByRole` recommended queries](https://testing-library.com/docs/queries/about/)) and ARIA labels to assign accessible names to elements so that they can be searched/filtered by their `aria-label` attributes using the `name` query option

