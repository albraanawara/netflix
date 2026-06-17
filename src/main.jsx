import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import AuthProvider from "./context/AuthContext";

import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
