import React, { useState } from 'react';
import styles from './ForgotPassword.module.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { forgotPassword } from '../../services/loginServices'; // Make sure this function is properly implemented
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import CircularProgress from '@mui/material/CircularProgress';
import Logo from '../../components/Logo/Logo';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailerror, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { email };
      const response = await forgotPassword(userData);
      console.log('Password Reset successful:', response);
      navigate('/check-email', { state: { email } });
      setLoading(false);
    } catch (error) {
      setEmailError(true);
      setErrorMessage(error.response.data.error); 
      setLoading(false);
     }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-container"]}>
      <Logo />
      <h2 style={{marginBottom: "0px"}}>Forgot password?</h2>
      <h3>No worries, we'll send you reset instructions.</h3>
      <div className={styles["form-group"]}>
      {/* <div className="form-group"> */}
        <CustomTextField
          id="email"
          name="email"
          type="email"
          labelText='Email'
          placeholder='Enter your email'
          textFieldMargin='none'
          TextFieldWidth="full"
          required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailerror && <div className={styles["error-message"]}>{errorMessage}</div>}
      </div>
      <button style={{ marginTop: "0px" }} className={styles["reset-password-button"]}>{loading ? <CircularProgress size={12} color="inherit" /> : "Reset password"}</button>
      <button className={styles["back-to-login-button"]} onClick={() => navigate('/')}> 
        <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>
        Back to log in
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
