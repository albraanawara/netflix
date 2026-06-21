import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./app/context/AuthContext.jsx";
import WishlistProvider from "./app/context/WishlistContext.jsx";
import { ThemeProvider } from "./app/context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <Toaster position="top-right" />
          <App />
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
