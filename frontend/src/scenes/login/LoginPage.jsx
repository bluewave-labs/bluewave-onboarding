import React, { useState } from 'react';
import './Login.css'; 
import GoogleSignInButton from '../../components/Button/GoogleSignInButton/GoogleSignInButton';
import { login } from '../../services/apiServices';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
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
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </div>
      <button className="sign-in-button" onClick={handleLogin}>
        Sign in
      </button>
      <GoogleSignInButton/>
      <div className="sign-up-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}

export default LoginPage;
