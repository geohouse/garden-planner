import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom/client";
import TestApp from "./TestApp.js";
import sumNums from "./sumNums.js";

it("Sum of two numbers", () => {
  expect(sumNums(23, 4)).toEqual(27);
  expect(sumNums(-12, -5)).toEqual(-17);
});

it("Smoke test of rendering without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.createRoot(div).render(<TestApp />);
});

it("Renders Gussy message", () => {
  render(<TestApp />);
  expect(screen.getByText("Gussy testing!")).toBeInTheDocument();
});
