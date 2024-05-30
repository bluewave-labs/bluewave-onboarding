import { Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import LoginPage from "./scenes/login/LoginPage";
import CreateAccountPage from "./scenes/login/CreateAccountPage";
import PasswordResetPage from "./scenes/login/PassswordResetPage";
import ForgotPasswordPage from "./scenes/login/ForgotPasswordPage";
import CheckYourEmailPage from "./scenes/login/CheckYourEmailPage";
import SetNewPasswordPage from "./scenes/login/SetNewPassword";
import Switch from "./components/Switch/Switch";
import Checkbox from "./components/CheckBox/CheckBox";
import CheckIcon from "./components/CheckIcons/CheckIcons";
import MUIRadio from "./components/Radio/RadioButton";
// import Logo from "./components/Logo/Logo";
import TestLogo from "./components/Logo/TestLogo";


function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isLoggedIn); // TODO: redux implementation
  const isAuthenticated = true;// emulate login
  return (
    <>
  <Logo /> 
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage />} />   
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="checkicon" element={<CheckIcon/>}/>
        <Route path="/checkbox" element={<MUIRadio/>}/>
      </Routes>    
    </>
  );
}

export default App;