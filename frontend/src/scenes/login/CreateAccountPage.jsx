import React, { useState } from 'react';
import styles from './Login.module.css'; 
import CustomTextField from '@components/TextFieldComponents/CustomTextField/CustomTextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import { signUp } from '../../services/loginServices';
import CustomLink from '@components/CustomLink/CustomLink';
import { handleAuthSuccess } from '../../utils/loginHelper';
import { useAuth } from '../../services/authProvider';
import { useNavigate } from 'react-router-dom';
import Logo from '@components/Logo/Logo';

function CreateAccountPage() {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', confirmPassword: '' });
  const [validation, setValidation] = useState({ isNameValid: false, isSurnameValid: false, isEmailValid: false, isPasswordValid: false, doPasswordsMatch: false });
  const [passwordChecks, setPasswordChecks] = useState({ hasSpecialCharacter: false, atLeastEightCharacters: false });
  const [error, setError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [loading, setLoading] = useState('');
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const isValidName = (value) => /^[A-Za-z'-]+$/.test(value) && value.length > 0 ;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordMatch = (password, confirmPassword) => {
    if (password === '' && confirmPassword === '') {
      setPasswordMatchError('');
      return true;
    }
    if (password != confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      return false;
    } else {
      setPasswordMatchError('');
      return true;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'name':
        setValidation((prev) => ({...prev, isNameValid: isValidName(value)}));
        break;
      case 'surname':
        setValidation((prev) => ({ ...prev, isSurnameValid: isValidName(value) }));
        break;
      case 'email':
        setValidation((prev) => ({ ...prev, isEmailValid: validateEmail(value) }));
        break;
      case 'password':
        const hasSpecialCharacter = /[!@#$%^&*-_]/.test(value);
        const atLeastEightCharacters = value.length >= 8;
        setPasswordChecks({ hasSpecialCharacter, atLeastEightCharacters });
        setValidation((prev) => ({
          ...prev,
          isPasswordValid: hasSpecialCharacter && atLeastEightCharacters,
          doPasswordsMatch: passwordMatch(value, formData.confirmPassword),
        }));
        break;
      case 'confirmPassword':
        setValidation((prev) => ({ ...prev, doPasswordsMatch: passwordMatch(value, formData.password) }));
        break;
      default:
        break;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, surname, email, password } = formData;
    const { isNameValid, isSurnameValid, isEmailValid, isPasswordValid, doPasswordsMatch } = validation;

    if (!isNameValid || (surname && !isSurnameValid) || !isEmailValid || !isPasswordValid || !doPasswordsMatch) {
      alert('Please fill out the form correctly.');
      setLoading(false);
      return;
    }

    const userData = { name: name, surname: surname, email: email, password: password };

    try {
      const response = await signUp(userData);
      handleAuthSuccess(response, loginAuth, navigate);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.data) {
        if (error.response.data.error === 'Email already exists') {
          setError('Email already exists');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        console.log(error);
        setError('An error occurred. Please check your network connection and try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSignUp} className={styles["login-container"]}>
      <Logo />
      <h2>Create admin account</h2>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="name"
          name="name"
          type="name"
          labelText='Name*:'
          checkCircleIconVisible={true}
          displayCheckCircleIcon={validation.isNameValid}
          placeholder='Enter your name'
          textFieldMargin='none'
          TextFieldWidth="full"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="surname"
          name="surname"
          type="name"
          labelText='Surname*:'
          checkCircleIconVisible={true}
          displayCheckCircleIcon={validation.isSurnameValid}
          placeholder='Enter your surname'
          textFieldMargin='none'
          TextFieldWidth="full"
          required
          value={formData.surname}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="email"
          type="email"
          name="email"
          labelText='Email*:'
          checkCircleIconVisible={true}
          displayCheckCircleIcon={validation.isEmailValid}
          placeholder='Enter your email'
          textFieldMargin='none'
          TextFieldWidth="full"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        {error && <div className={styles["error-message"]}>{error}</div>}
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="password"
          type="password"
          name="password"
          labelText='Password*:'
          checkCircleIconVisible={true}
          displayCheckCircleIcon={validation.isPasswordValid}
          placeholder='Create your password'
          textFieldMargin='none'
          TextFieldWidth="full"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          labelText='Confirm password*:'
          checkCircleIconVisible={true}
          displayCheckCircleIcon={validation.doPasswordsMatch}
          placeholder='Confirm your password'
          textFieldMargin='none'
          TextFieldWidth="full"
          required
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      {passwordMatchError && <div className={styles["error-message"]}>{passwordMatchError}</div>}
      </div>

      <div className={styles["password-constraints"]}>
        <CheckCircleIcon style={{ color: passwordChecks.atLeastEightCharacters ? 'green' : 'var(--light-border-color)', fontSize: '20px', marginRight: '5px' }} />
        Must be at least 8 characters
      </div>
      <div className={styles["password-constraints"]}>
        <CheckCircleIcon style={{ color: passwordChecks.hasSpecialCharacter ? 'green' : 'var(--light-border-color)', fontSize: '20px', marginRight: '5px' }} />
        Must contain one special character
      </div>

      <button className={styles["create-account-button"]} type="submit" disabled={loading}>
        {loading ? <CircularProgress size={12} color="inherit" /> : "Get started"}
      </button>
      <div className={styles["sign-up-link"]}>
        Already have an account? <CustomLink text="Log in" url="/" />
      </div>
    </form>
  );
}

export default CreateAccountPage;
