import React, { useState } from 'react';
import './Login.css';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import { signUp } from '../../services/loginServices';
import CustomLink from '../../components/CustomLink/CustomLink';
import { handleAuthSuccess } from '../../utils/loginHelper';
import { useAuth } from '../../services/authProvider';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '' });
  const [validation, setValidation] = useState({ isNameValid: false, isSurnameValid: false, isEmailValid: false, isPasswordValid: false });
  const [passwordChecks, setPasswordChecks] = useState({ hasSpecialCharacter: false, atLeastEightCharacters: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'name':
        setValidation((prev) => ({ ...prev, isNameValid: value.length > 0 }));
        break;
      case 'surname':
        setValidation((prev) => ({ ...prev, isSurnameValid: value.length > 0 }));
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
          isPasswordValid: hasSpecialCharacter && atLeastEightCharacters
        }));
        break;
      default:
        break;
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, surname, email, password } = formData;
    const { isNameValid, isSurnameValid, isEmailValid, isPasswordValid } = validation;

    if (!isNameValid || (surname && !isSurnameValid) || !isEmailValid || !isPasswordValid) {
      alert('Please fill out the form correctly.');
      setLoading(false);
      return;
    }

    const userData = { name: name, surname: surname, email: email, password: password };

    try {
      const response = await signUp(userData);
      handleAuthSuccess(response, loginAuth, navigate)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        if (error.response.data.error === 'Email already exists') {
          setError('Email already exists');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        console.log(error)
        setError('An error occurred. Please check your network connection and try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSignUp} className="login-container">
      <h2>Create an account</h2>
      <div className="form-group">
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
          required="true"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
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
          required="true"
          value={formData.surname}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
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
          required="true"
          value={formData.email}
          onChange={handleInputChange}
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="form-group">
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
          required="true"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="password-constraints">
        <CheckCircleIcon style={{ color: passwordChecks.atLeastEightCharacters ? 'green' : '#D0D5DD', fontSize: '20px', marginRight: '5px' }} />
        Must be at least 8 characters
      </div>
      <div className="password-constraints">
        <CheckCircleIcon style={{ color: passwordChecks.hasSpecialCharacter ? 'green' : '#D0D5DD', fontSize: '20px', marginRight: '5px' }} />
        Must contain one special character
      </div>

      <button className="create-account-button" type="submit">
        {loading ? <CircularProgress size={12} color="inherit" /> : "Get started"}
      </button>
      <div className="sign-up-link">
        Already have an account? <CustomLink text="Log in" url="/" />
      </div>
    </form>
  );
}

export default CreateAccountPage;
