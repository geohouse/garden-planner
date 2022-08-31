import React from "react";
//import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// interface DocumentSelected

// When selecting by id name or class name (both strings), the matching type definition
// in the lib.dom.d.ts file (https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts) is:
// querySelector<E extends Element = Element>(selectors: string): E | null;
// so the expected types in this case (can verify by mousing over 'reactRootElement') are: Element | null;
const reactRootElement = document.querySelector("#react-root");

// 2 other options that wouldn't require the if statement below checking for null type.
// (both of these assume that the element IS present in the DOM, and therefore will always
// have type Element - we're telling TypeScript that this is always going to be true)
// Reference: https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter
// const reactRootElement = document.querySelector("#react-root") as Element; // This is a 'type assertion' / 'cast' of the result as an Element type
// const reactRootElement = document.querySelector("#react-root")!; // This removes the possibility of a null or undefined type from the prior expression.

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
