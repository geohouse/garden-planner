import { render, screen } from "@testing-library/react";
import Button from "./Button.js";

it("should render a button element with a 'ui-button' class", () => {
  render(<Button />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.classList.contains("ui-button")).toBe(true);
});

it("should have a disabled attribute when it receives a disabled prop", () => {
  render(<Button disabled />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement.disabled).toBe(true);
});
