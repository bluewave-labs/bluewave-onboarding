import React, { useState } from 'react';
import styles from './Login.module.css';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import CircularProgress from '@mui/material/CircularProgress';
import { login } from '../../services/loginServices';
import CustomLink from '../../components/CustomLink/CustomLink';
import { handleAuthSuccess } from '../../utils/loginHelper';
import { useAuth } from '../../services/authProvider';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { AUTH_TYPE } from '../../utils/constants';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      handleAuthSuccess(response, loginAuth, navigate, AUTH_TYPE.LOGIN);
      setLoading(false);
    } catch (error) {
      setLoginError(true);
      setLoading(false);
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      }
      else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setErrorMessage('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles["login-container"]}>
      <Logo />
      <h2>Log in to your account</h2>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="email"
          placeholder='Enter email'
          labelText='Email:'
          textFieldMargin='none'
          TextFieldWidth="full"
          required={true}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="password"
          placeholder='Enter password'
          labelText='Password:'
          textFieldMargin='none'
          TextFieldWidth="full"
          type="password"
          required={true}
          value={password}
          onChange={handlePasswordChange}
        />
        {loginError && <div className={styles["error-message"]}>{errorMessage}</div>}
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
      <button className={styles["sign-in-button"]} type="submit" disabled={loading}>
        {loading ? <CircularProgress size={12} color="inherit" /> : 'Sign In'}
      </button>
      <div className={styles["sign-up-link"]}>
        Don't have an account? <CustomLink text="Sign up" url="/signup" />
      </div>
    </form>
  );
}

export default LoginPage;
