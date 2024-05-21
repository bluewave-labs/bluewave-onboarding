import React from 'react';
import './login.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PasswordResetPage() {
  return (
    <body class="login-body">
    <div className="login-container">
      <h2 style={{marginBottom: "0px"}}>Password reset</h2>
      <h3>Your password has been successfully reset. Click below to log in manually.</h3>
      <button className="sign-in-button" style={{marginRTop: "20px"}}>
        Continue
      </button>
      <button className="back-to-login-button"> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
    </body>
  );
}

export default PasswordResetPage;
