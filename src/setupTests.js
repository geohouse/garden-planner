// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// global.ResizeObserver = jest.fn().mockImplementation(() => ({
//   observe: jest.fn(),
//   unobserve: jest.fn(),
//   disconnect: jest.fn(),
// }));

// import "@testing-library/jest-dom/extend-expect";
// import "jest-extended";

// jest.mock("./hooks/useResizeObserver", () => () => ({
//   __esModule: true,
//   default: jest.fn().mockImplementation(() => ({
//     observe: jest.fn(),
//     unobserve: jest.fn(),
//     disconnect: jest.fn(),
//   })),
// }));

// This polyfill is needed to get jest-dom to run Chart.js charting
// and therefore the ability to test the app with its full functionality
// without needing to remove the Chart graphing for testing.
global.ResizeObserver = require("resize-observer-polyfill");
