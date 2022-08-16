import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.js";
//import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("Renders the main app successfully", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<App />);
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
