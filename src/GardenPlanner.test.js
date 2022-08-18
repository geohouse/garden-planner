import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import AddPlant from "./AddPlant.js";
import GardenPlanner from "./GardenPlanner.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import ResizeObserver from "./__mocks__/ResizeObserver";
// import { act } from "react-dom/test-utils";

it("use jsdom in this test file", () => {
  const element = document.createElement("div");
  console.log("testing");
  expect(element).not.toBeNull();
});

it("Renders the main app successfully", () => {
  //   const div = document.createElement("div");
  //   const root = createRoot(div);
  render(<App />);

  //   const user = userEvent.setup();
  //   const { getByText } = render(<App />);
});

it("Plant information entered in the PlantList is stored correctly when Add plant button is clicked", () => {
  const handleSubmit = jest.fn();
  //const div = document.createElement("div");
  //const root = createRoot(div);
  render(<GardenPlanner onSubmit={handleSubmit} />);
  userEvent.type(screen.getByLabelText("Plant name"), "Cosmos");
  //   const user = userEvent.setup();
  //   const { getByText } = render(<App />);
});

// it("Renders the main app successfully", () => {
//   const root = createRoot(document.querySelector("#react-root"));
//   root.render(<App />);
// });

// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// const root = createRoot(document.querySelector("#react-root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
