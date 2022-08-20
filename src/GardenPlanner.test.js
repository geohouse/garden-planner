import React from "react";
//import ReactDOM from "react-dom";
import App from "./App.js";
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

it("Successfully submit Butterfly bush that attracts bees, hummingbirds, and butterflies", () => {
  const handleSubmit = jest.fn();
  //const div = document.createElement("div" );
  //const root = createRoot(div);
  render(<GardenPlanner onSubmit={handleSubmit} />);
  // Add a test plant
  userEvent.type(screen.getByLabelText("Plant name"), "Butterfly bush");
  // Check all of the wildlife options (bees, butterflies, hummingbirds)
  userEvent.click(screen.getByLabelText("Bees?"));
  userEvent.click(screen.getByLabelText("Butterflies?"));
  userEvent.click(screen.getByLabelText("Hummingbirds?"));
  // Verify the wildlife options are in fact checked - a bit hacky but functional to verify.
  //console.log("Is bees clicked?");
  //console.log(document.querySelector("#attracts-bees").checked);

  // Submit the new plant
  userEvent.click(screen.getByLabelText("Add plant to the garden plan?"));
  //expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(
    screen.getByRole("listitem", { name: /plant-name/i })
  ).toHaveTextContent("Butterfly bush");

  expect(
    screen.getByRole("listitem", { name: /wildlife-attracted/i })
  ).toHaveTextContent("bees, butterflies, hummingbirds");
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
