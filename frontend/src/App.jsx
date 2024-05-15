import { Routes, Route } from "react-router-dom";
import Home from "./scenes/global/Home";
import LoginPage from "./scenes/login/LoginPage";
import CreateAccountPage from "./scenes/login/CreateAccountPage";
import PasswordResetPage from "./scenes/login/PassswordResetPage";
import ForgotPasswordPage from "./scenes/login/ForgotPasswordPage";
import CheckYourEmailPage from "./scenes/login/CheckYourEmailPage";
import SetNewPasswordPage from "./scenes/login/SetNewPassword";

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isLoggedIn); // TODO: redux implementation
  const isAuthenticated = true;// emulate login
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage />} />   
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
      </Routes>    
    </>
  );
}

export default App;