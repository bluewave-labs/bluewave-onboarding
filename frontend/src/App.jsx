import { Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import LoginPage from "./scenes/login/LoginPage";
import CreateAccountPage from "./scenes/login/CreateAccountPage";
import PasswordResetPage from "./scenes/login/PassswordResetPage";
import ForgotPasswordPage from "./scenes/login/ForgotPasswordPage";
import CheckYourEmailPage from "./scenes/login/CheckYourEmailPage";
import SetNewPasswordPage from "./scenes/login/SetNewPassword";
import Private from "@components/Private";
import ProgressStepsMain from "./scenes/progressSteps/ProgressStepsMain";
import Settings from "./scenes/settings/Settings";
import BannerPage from "./scenes/banner/CreateBannerPage";
import BannerDefaultPage from "./scenes/banner/BannerDefaultPage";
import LinksDefaultPage from "./scenes/links/LinksDefaultPage";
import ToursDefaultPage from "./scenes/tours/ToursDefaultPage";
import PopupDefaultPage from "./scenes/popup/PopupDefaultPage";
import HintDefaultPage from "./scenes/hints/HintDefaultPage";
import CreatePopupPage from "./scenes/popup/CreatePopupPage";
import { Error404 } from "./scenes/errors/404";
import { Error403 } from "./scenes/errors/403";
import HomePageTemplate from "./templates/HomePageTemplate/HomePageTemplate";

const App = () => {

  return (
      <Routes>
        <Route path="/" element={<Private Component={HomePageTemplate} />}>
          <Route index element={<Home />} />
          <Route path="link" element={<LinksDefaultPage />} />
          <Route path="tour" element={<ToursDefaultPage />} />
          <Route path="/banner/create" element={<BannerPage />} />
          <Route path="/popup/create" element={<Private Component={CreatePopupPage} />} />
          <Route path="/banner" element={<Private Component={BannerDefaultPage} />} />
          <Route path="/popup" element={<Private Component={PopupDefaultPage} />} />
          <Route path="/hint" element={<HintDefaultPage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/check-email" element={<CheckYourEmailPage />} />
        <Route path="/set-new-password" element={<SetNewPasswordPage />} />


    
        <Route path="/progress-steps" element={<ProgressStepsMain />} />
        <Route path="/banner/create" element={<BannerPage />} />
        <Route path="/popup/create" element={<Private Component={CreatePopupPage} />} />
        <Route path="/banner" element={<Private Component={BannerDefaultPage} />} />
        <Route path="/popup" element={<Private Component={PopupDefaultPage} />} />
        <Route path="/link" element={<LinksDefaultPage />} />
        <Route path="/tour" element={<ToursDefaultPage />} />
        <Route path="/hint" element={<HintDefaultPage />} />
        <Route path="/popup" element={<PopupDefaultPage/>} />
        <Route path="/403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
  );
}

export default App;
