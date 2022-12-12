import React from "react";
import ReactDOM from "react-dom/client";
import { FullCalendarApp } from "./FullCalendarApp";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FullCalendarApp />
  </React.StrictMode>
);
