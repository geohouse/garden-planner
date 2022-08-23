import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter.js";

it("should increment the counter on every click", () => {
  render(<Counter />);
  const text0 = screen.getByText(/0 times clicked/i);
  expect(text0).toBeInTheDocument();

  const button = screen.getByRole("button");
  // Click should add 1
  fireEvent.click(button);
  const text1 = screen.getByText(/1 times clicked/i);
  expect(text1).toBeInTheDocument();

  fireEvent.click(button);
  const text2 = screen.getByText(/2 times clicked/i);
  expect(text2).toBeInTheDocument();
});
