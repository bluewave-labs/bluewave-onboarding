import React from 'react';
import './login.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CheckYourEmailPage = () => {
  return (
    <body class="login-body">
    <div className="login-container">
      <h2>Check Your Email</h2>
      <h3 style={{margin: "0px"}}>We sent a password reset link to</h3>
      <h3 style={{marginTop: "5px", fontWeight: "bold", marginBottom:"10px"}}>olivia@email.com</h3>
      <button className="create-account-button" style={{marginBottom: "30px"}}>Open email app</button>
      <div className="sign-up-link">
      Didn't receive the email? <a href="#">Click to resend</a>
      </div>
      <button className="back-to-login-button" style={{marginTop: "20px"}}> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
    </body >
  );
};

export default CheckYourEmailPage;
