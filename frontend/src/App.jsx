import { Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import LoginPage from "./scenes/login/LoginPage";
import CreateAccountPage from "./scenes/login/CreateAccountPage";
import PasswordResetPage from "./scenes/login/PassswordResetPage";
import ForgotPasswordPage from "./scenes/login/ForgotPasswordPage";
import CheckYourEmailPage from "./scenes/login/CheckYourEmailPage";
import SetNewPasswordPage from "./scenes/login/SetNewPassword";
import ProductTour from "./scenes/productTour/ProductTour";
import LeftMenu from "./components/LeftMenu/LeftMenu"
import Header from "./components/Header/Header"
import FileUpload from "./components/Fileupload/FileUpload"


function App() {
    // const isAuthenticated = useSelector((state) => state.auth.isLoggedIn); // TODO: redux implementation
    const isAuthenticated = true;// emulate login
    const user = {
        name: 'John Doe',
        role: 'Administrator',
    };
    return (
        <>
            {isAuthenticated ?
                <div className="container">
                    <Header user={user} />
                    <div className="content-container">
                        <LeftMenu className="sidebar" />
                        <Routes>
                            <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage />} />
                            <Route path="/tours" element={<ProductTour />} />
                            <Route path="/upload" element={<FileUpload />} />
                        </Routes>
                    </div>
                </div>
                :
                <Routes >
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<CreateAccountPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<PasswordResetPage />} />
                    <Route path="/check-email" element={<CheckYourEmailPage />} />
                    <Route path="/set-new-password" element={<SetNewPasswordPage />} />
                </Routes>
            }
        </>
    );
}

export default App;