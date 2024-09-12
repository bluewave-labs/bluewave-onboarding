import React, { useState } from 'react';
import './Login.css'; 
import GoogleSignInButton from '../../components/Button/GoogleSignInButton/GoogleSignInButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

  const handleSignUp = async () => {
    const { name, surname, email, password } = formData;
    const { isNameValid, isSurnameValid, isEmailValid, isPasswordValid } = validation;

    if (!isNameValid || (surname && !isSurnameValid) || !isEmailValid || !isPasswordValid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const userData = { name: name, surname: surname, email: email, password: password };

    try {
      const response = await signUp(userData);
      handleAuthSuccess(response, loginAuth, navigate)
    } catch (error) {
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
    <div className="login-container">
      <h2>Create an account</h2>
      <div className="form-group">
        <div className='check-div'>
          {validation.isNameValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
          <label htmlFor="name">Name*:</label>
        </div>
        <input
          id="name"
          type="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <div className='check-div'>
          {validation.isSurnameValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
          <label htmlFor="surname">Surname*:</label>
        </div>
        <input
          id="surname"
          type="name"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          placeholder="Enter your surname"
        />
      </div>

      <div className="form-group">
        <div className='check-div'>
          {validation.isEmailValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
          <label htmlFor="email">Email*:</label>
        </div>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="form-group">
        <div className='check-div'>
          {validation.isPasswordValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
          <label htmlFor="password">Password*:</label>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create your password"
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

      <button className="create-account-button" onClick={handleSignUp}>
        Get started
      </button>
      <GoogleSignInButton />
      <div className="sign-up-link">
        Already have an account? <CustomLink text="Log in" url="/" />
      </div>
    </div>
  );
}

export default CreateAccountPage;
