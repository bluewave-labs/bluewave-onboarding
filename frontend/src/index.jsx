import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router} from "react-router-dom";
import theme from "./assets/theme.js";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./services/authProvider.jsx";
import Toast from "./components/Toast/Toast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Toast />
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);