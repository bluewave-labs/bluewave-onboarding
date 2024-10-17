import React from 'react';
import styles from './Login.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLink from '../../components/CustomLink/CustomLink';

const CheckYourEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email: emailFromState } = location.state || {};

  return (
    <div className={styles["login-container"]}>
      <h2>Check Your Email</h2>
      <h3 style={{margin: "0px"}}>We sent a password reset link to</h3>
      <h3 style={{marginTop: "5px", fontWeight: "bold", marginBottom:"10px"}}>{emailFromState}</h3>
      <button className={styles["create-account-button"]} style={{marginBottom: "30px"}}>Open email app</button>
      <div className={styles["sign-up-link"]}>
      Didn't receive the email? <CustomLink text="Click to resend" url="#" />
      </div>
      <button className={styles["back-to-login-button"]} style={{marginTop: "20px"}} onClick={() => navigate('/')}> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
  );
};

export default CheckYourEmailPage;
