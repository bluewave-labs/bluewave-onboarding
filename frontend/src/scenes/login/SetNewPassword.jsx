import React, { useState } from 'react';
import styles from './Login.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import { resetPassword } from '../../services/loginServices';
import { useNavigate } from 'react-router-dom';

function SetNewPasswordPage({ email = 'asdf@asdf.com' }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [atLeastEightCharacters, setAtLeastEightCharacters] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await resetPassword({ email, password });
      setLoading(false);
      console.log('Password Reset successful:', response);
      navigate('/reset-password');
    } catch (error) {
      setLoading(false);
      console.error('Password Reset failed:', error);
    }
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasSpecialCharacter(hasSpecialCharacterCheck(e.target.value));
    setAtLeastEightCharacters(atLeastEightCharactersCheck(e.target.value));
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const hasSpecialCharacterCheck = (password) => {
    const regex = /[!@#$%^&*-_]/;
    return regex.test(password);
  };

  const atLeastEightCharactersCheck = (password) => {
    return password.length >= 8;
  };

  const validatePassword = (password) => {
    return atLeastEightCharactersCheck(password) && hasSpecialCharacterCheck(password);
  };

  return (
    <div className={styles["login-body"]}>
      <form onSubmit={handleResetPassword} className={styles["login-container"]}>
        <h2 style={{ marginBottom: "0px" }}>Set new Password</h2>
        <h3>Your new password must be different to previously used passwords.</h3>
        <div className={styles["form-group"]}>
          <CustomTextField
            id="password"
            type="password"
            name="password"
            labelText='Password*:'
            checkCircleIconVisible={true}
            displayCheckCircleIcon={isPasswordValid}
            placeholder='Create your password'
            textFieldMargin='none'
            TextFieldWidth="full"
            required="true"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <CustomTextField
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            labelText='Confirm Password*:'
            checkCircleIconVisible={true}
            displayCheckCircleIcon={isPasswordValid && password === confirmPassword}
            placeholder='Confirm your password'
            textFieldMargin='none'
            TextFieldWidth="full"
            required="true"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div className={styles["password-constraints"]}>
          <CheckCircleIcon style={{ color: atLeastEightCharacters ? 'green' : '#D0D5DD', fontSize: '20px', marginRight: "5px" }} />
          Must be at least 8 characters
        </div>
        <div className={styles["password-constraints"]}>
          <CheckCircleIcon style={{ color: hasSpecialCharacter ? 'green' : '#D0D5DD', fontSize: '20px', marginRight: "5px" }} />
          Must contain one special character
        </div>
        <button type="submit" className={styles["sign-in-button"]} style={{ marginTop: "15px" }}>
          {loading ? <CircularProgress size={12} color="inherit" /> : 'Reset Password'}
        </button>
        <button type="button" onClick={() => navigate('/login')} className={styles["back-to-login-button"]}> <ArrowBackIcon style={{ fontSize: "18px", marginRight: "5px" }} />Back to log in</button>
      </form>
    </div>
  );
}

export default SetNewPasswordPage;
