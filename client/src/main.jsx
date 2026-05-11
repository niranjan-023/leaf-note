import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";


// =========================
// RENDER BACKEND WARMUP
// =========================

const warmupBackend = async () => {
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL.replace("/api", "")}/health`
    );

	await fetch(`https://sentinelai-api-yc5z.onrender.com/health`);
  } catch {
    console.log("Backend warmup failed");
  }
};

warmupBackend();


// =========================
// APP
// =========================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);