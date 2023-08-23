import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// import DateCounter from "./DateCounter";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />

    {/* <DateCounter /> */}
  </React.StrictMode>
);
