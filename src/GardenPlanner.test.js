import React from "react";
//import ReactDOM from "react-dom";
import App from "./App.js";
import GardenPlanner from "./GardenPlanner.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorBlocks from "./ColorBlocks.js";
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

it("Renders the expected number of bloom color buttons with the expected labels", () => {
  render(<ColorBlocks />);
  expect(screen.getAllByRole("button").length).toEqual(13);
});

it("Makes sure bloom color buttons are visible and provides the name of the color on each of the bloom color buttons", () => {
  render(<ColorBlocks />);
  //screen.debug(screen.getAllByRole("button"));
  // Need ^ and $ to force full string matches for color names that
  // have a 'light' variant. Capturing groups with () and global match with /gi didn't work.
  expect(screen.getByRole("button", { name: /red/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /^orange$/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /^yellow$/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /green/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /^blue$/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /purple/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /white/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /pink/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /^light blue$/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /lavender/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /^light orange$/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /^light yellow$/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /none/i })).toBeVisible();
});

it("Successfully submit Butterfly bush with purple flowers that attracts bees, hummingbirds, and butterflies", () => {
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
  userEvent.click(screen.getByRole("button", { name: /purple/i }));
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

  expect(
    screen.getByRole("listitem", { name: /bloom-color-label/i })
  ).toHaveTextContent("Purple");
  //screen.debug();
  //expect(screen.)
  //   const user = userEvent.setup();
  //   const { getByText } = render(<App />);
});

it("Successfully submit little bluestem that does not attract bees, hummingbirds, or butterflies", () => {
  const handleSubmit = jest.fn();
  //const div = document.createElement("div" );
  //const root = createRoot(div);
  render(<GardenPlanner onSubmit={handleSubmit} />);
  // Add a test plant
  userEvent.type(screen.getByLabelText("Plant name"), "Little bluestem");
  // Check all of the wildlife options (bees, butterflies, hummingbirds)
  // userEvent.click(screen.getByLabelText("Bees?"));
  // userEvent.click(screen.getByLabelText("Butterflies?"));
  // userEvent.click(screen.getByLabelText("Hummingbirds?"));
  // Verify the wildlife options are in fact checked - a bit hacky but functional to verify.
  //console.log("Is bees clicked?");
  //console.log(document.querySelector("#attracts-bees").checked);

  // Submit the new plant
  userEvent.click(screen.getByLabelText("Add plant to the garden plan?"));
  //expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(
    screen.getByRole("listitem", { name: /plant-name/i })
  ).toHaveTextContent("Little bluestem");

  expect(
    screen.getByRole("listitem", { name: /wildlife-attracted/i })
  ).toHaveTextContent("");
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
