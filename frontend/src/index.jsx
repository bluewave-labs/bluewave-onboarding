import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router} from "react-router-dom";
import { lightTheme } from "./assets/theme";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./services/authProvider.jsx";
import Toast from "@components/Toast/Toast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <Toast />
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);