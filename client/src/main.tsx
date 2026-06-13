import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
window.addEventListener("unhandledrejection", (event) => {
  const msg = String(event.reason?.message || "");

  if (
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("ChunkLoadError")
  ) {
    window.location.reload();
  }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
