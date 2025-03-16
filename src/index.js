import React from "react";
import ReactDOM from "react-dom/client"; // ✅ React 18 방식
import Main from "./Main";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ createRoot 사용
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
