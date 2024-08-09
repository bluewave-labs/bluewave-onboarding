import React from 'react';
import './Login.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckYourEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email: emailFromState } = location.state || {};

  return (
    <div className="login-container">
      <h2>Check Your Email</h2>
      <h3 style={{margin: "0px"}}>We sent a password reset link to</h3>
      <h3 style={{marginTop: "5px", fontWeight: "bold", marginBottom:"10px"}}>{emailFromState}</h3>
      <button className="create-account-button" style={{marginBottom: "30px"}}>Open email app</button>
      <div className="sign-up-link">
      Didn't receive the email? <a href="#">Click to resend</a>
      </div>
      <button className="back-to-login-button" style={{marginTop: "20px"}} onClick={() => navigate('/')}> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
  );
};

export default CheckYourEmailPage;
