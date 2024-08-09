import React, { useState } from 'react';
import './Login.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { forgotPassword } from '../../services/loginServices'; // Make sure this function is properly implemented
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailerror, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const userData = { email };
      const response = await forgotPassword(userData);
      console.log('Password Reset successful:', response);
      navigate('/check-email', { state: { email } });
    } catch (error) {
      setEmailError(true);
      setErrorMessage(error.response.data.error); 
     }
  };

  return (
    <div className="login-container">
      <h2 style={{marginBottom: "0px"}}>Forgot password?</h2>
      <h3>No worries, we'll send you reset instructions.</h3>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        {emailerror && <div className='error-message'>{errorMessage}</div>}
      </div>
      <button style={{marginTop: "0px"}} className="create-account-button" onClick={handleForgotPassword}>Reset password</button>
      <button className="back-to-login-button" onClick={() => navigate('/')}> 
        <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>
        Back to log in
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
