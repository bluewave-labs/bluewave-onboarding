import { Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import LoginPage from "./scenes/login/LoginPage";
import CreateAccountPage from "./scenes/login/CreateAccountPage";
import PasswordResetPage from "./scenes/login/PassswordResetPage";
import ForgotPasswordPage from "./scenes/login/ForgotPasswordPage";
import CheckYourEmailPage from "./scenes/login/CheckYourEmailPage";
import SetNewPasswordPage from "./scenes/login/SetNewPassword";
import Private from "./components/Private";
import { useAuth } from "./services/authProvider";
import ProgressStepsMain from "./scenes/progressSteps/ProgressStepsMain";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Routes>
        {/* <Route path="/" element={isLoggedIn ? <Private Component={Home} /> : <LoginPage />} />    */}
        {/* <Route path="/home" element={<Private Component={Home} />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/check-email" element={<CheckYourEmailPage />} />
        <Route path="/set-new-password" element={<SetNewPasswordPage />} />
        <Route path="/progress-steps" element={<ProgressStepsMain />} />
      </Routes>    
    </>
  );
}

export default App;