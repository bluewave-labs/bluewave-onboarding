import React, { useState } from "react";
import styles from "./Login.module.css";
import CustomTextField from "../../components/TextFieldComponents/CustomTextField/CustomTextField";
import CircularProgress from "@mui/material/CircularProgress";
import { login } from "../../services/loginServices";
import CustomLink from "../../components/CustomLink/CustomLink";
import { handleAuthSuccess } from "../../utils/loginHelper";
import { useAuth } from "../../services/authProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);
    try {
      const response = await login(email, password);
      handleAuthSuccess(response, loginAuth, navigate);
      setLoading(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrorMessages(error.response.data.errors);
      } else if (error.response?.data?.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["An error occurred. Please try again."]);
      }
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessages([]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessages([]);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-container"]}>
      <Logo />
      <h2>Log in to your account</h2>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="email"
          placeholder="Enter email"
          labelText="Email:"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="password"
          placeholder="Enter password"
          labelText="Password:"
          textFieldMargin="none"
          TextFieldWidth="full"
          type="password"
          required={true}
          value={password}
          onChange={handlePasswordChange}
        />
        {errorMessages.length > 0 &&
          errorMessages.map((msg, index) => (
            <div key={index} className={styles["error-message"]}>
              {msg}
            </div>
          ))}
      </div>
      <div className={styles["form-group"]}>
        <div className={styles["form-group-2"]}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember for 30 days
          </label>
          <CustomLink text="Forgot Password" url="/forgot-password" />
        </div>
      </div>
      <button
        className={styles["sign-in-button"]}
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={12} color="inherit" /> : "Sign In"}
      </button>
      <div className={styles["sign-up-link"]}>
        Don't have an account? <CustomLink text="Sign up" url="/signup" />
      </div>
    </form>
  );
}

export default LoginPage;
