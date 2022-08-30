import React from "react";
//import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// interface DocumentSelected

// When selecting by id name or class name (both strings), the matching type definition
// in the lib.dom.d.ts file is:
// querySelector<E extends Element = Element>(selectors: string): E | null;
// so the expected types in this case (can verify by mousing over 'reactRootElement') are: Element | null;
// const reactRootElement = document.querySelector("#react-root");

// When select by element type, i.e. div, the
// matching type definition in the lib.dom.d.ts file is:
//querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
// Where K is 'div' and the HTMLElementTagNameMap['div'] from the lib.dom.d.ts file is:
// HTMLDivElement, so the expected types in this case (can verify by mousing over 'reactRootElement') are: HTMLDivElement | null;
// const reactRootElement = document.querySelector("div");

if (reactRootElement !== null) {
  const root = createRoot(reactRootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("The React root element could not be found. Exiting.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
