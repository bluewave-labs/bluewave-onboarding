import React, { useState } from 'react';
import styles from './Login.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetPassword } from '../../services/loginServices';
import { useNavigate } from 'react-router-dom';

function SetNewPasswordPage({ email = 'asdf@asdf.com' }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [atLeastEightCharacters, setAtLeastEightCharacters] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword({ email, password });
      console.log('Password Reset successful:', response);
      navigate('/reset-password');
    } catch (error) {
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
      <div className={styles["login-container"]}>
        <h2 style={{ marginBottom: "0px" }}>Set new Password</h2>
        <h3>Your new password must be different to previously used passwords.</h3>
        <div className={styles["form-group"]}>
          <div className={styles["check-div"]}>
            {isPasswordValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
            <label>Password</label>
          </div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <div className={styles["form-group"]}>
          <div className={styles["check-div"]}>
            <label>Confirm Password</label>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
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
        <button className={styles["sign-in-button"]} style={{ marginTop: "15px" }} onClick={handleResetPassword}>
          Reset Password
        </button>
        <button className={styles["back-to-login-button"]}> <ArrowBackIcon style={{ fontSize: "18px", marginRight: "5px" }} />Back to log in</button>
      </div>
    </div>
  );
}

export default SetNewPasswordPage;
