import React, { useState } from 'react';
import './Login.css';
import GoogleSignInButton from '../../components/Button/GoogleSignInButton/GoogleSignInButton';
import { login } from '../../services/loginServices';
import CustomLink from '../../components/CustomLink/CustomLink';
import { handleAuthSuccess } from '../../utils/loginHelper';
import { useAuth } from '../../services/authProvider';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      handleAuthSuccess(response, loginAuth, navigate)
    } catch (error) {
      setLoginError(true);
      if (error.response?.data?.error){
        setErrorMessage(error.response.data.error);
      }
      else{
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Log in to your account</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && <div className='error-message'>{errorMessage}</div>}
      </div>
      <div className="form-group">
        <div className='form-group-2'>
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
      <button className="sign-in-button" onClick={handleLogin}>
        Sign in
      </button>
      <GoogleSignInButton />
      <div className="sign-up-link">
        Don't have an account? <CustomLink text="Sign up" url="/signup" />
      </div>
    </div>
  );
}

export default LoginPage;
