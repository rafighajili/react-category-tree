import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CategoryProvider } from "./context/CategoryProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </React.StrictMode>
);
