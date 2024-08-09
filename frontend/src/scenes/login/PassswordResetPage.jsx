import React from 'react';
import './Login.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function PasswordResetPage() {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <h2 style={{marginBottom: "0px"}}>Password reset</h2>
      <h3>Your password has been successfully reset. Click below to log in manually.</h3>
      <button className="sign-in-button" style={{marginRTop: "20px"}} onClick={() => navigate('/')}>
        Continue
      </button>
      <button className="back-to-login-button"> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
  );
}

export default PasswordResetPage;
