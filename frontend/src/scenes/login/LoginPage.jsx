import React, { useState } from 'react';
import './Login.css';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import CircularProgress from '@mui/material/CircularProgress';
import { login } from '../../services/loginServices';
import CustomLink from '../../components/CustomLink/CustomLink';
import { handleAuthSuccess } from '../../utils/loginHelper';
import { useAuth } from '../../services/authProvider';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

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
      handleAuthSuccess(response, loginAuth, navigate)
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
    <form onSubmit={handleSubmit} className="login-container">
      <Logo />
      <h2>Log in to your account</h2>
      <div className="form-group">
        <CustomTextField
          placeholder='Enter email'
          labelText='Email:'
          textFieldMargin='none'
          TextFieldWidth="full"
          required={true}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-group">
        <CustomTextField
          placeholder='Enter password'
          labelText='Password:'
          textFieldMargin='none'
          TextFieldWidth="full"
          type="password"
          required="true"
          value={password}
          onChange={handlePasswordChange}
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
      <button className="sign-in-button" type="submit">
        {loading ? <CircularProgress size={12} color="inherit" /> : 'Sign In'}
      </button>
      <div className="sign-up-link">
        Don't have an account? <CustomLink text="Sign up" url="/signup" />
      </div>
    </form>
  );
}

export default LoginPage;
