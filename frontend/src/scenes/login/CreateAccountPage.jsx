import React, { useState } from 'react';
import './Login.css'; 
import GoogleSignInButton from '../../components/Button/GoogleSignInButton/GoogleSignInButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { signUp } from '../../services/loginServices';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [validation, setValidation] = useState({ isUsernameValid: false, isEmailValid: false, isPasswordValid: false });
  const [passwordChecks, setPasswordChecks] = useState({ hasSpecialCharacter: false, atLeastEightCharacters: false });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'username':
        setValidation((prev) => ({ ...prev, isUsernameValid: value.length > 0 }));
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
    const { isUsernameValid, isEmailValid, isPasswordValid } = validation;
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      alert('Please fill out the form correctly.');
      return;
    }

    try {
      const response = await signUp(formData);
      console.log('Sign up successful:', response);
      navigate('/');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const formFields = [
    {
      label: 'Username*:',
      name: 'username',
      type: 'name',
      placeholder: 'Enter your username',
      isValid: validation.isUsernameValid
    },
    {
      label: 'Email*:',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      isValid: validation.isEmailValid
    },
    {
      label: 'Password*:',
      name: 'password',
      type: 'password',
      placeholder: 'Create your password',
      isValid: validation.isPasswordValid
    }
  ];

  return (
    <div className="login-container">
      <h2>Create an account</h2>
      
      {formFields.map(({ label, name, type, placeholder, isValid }) => (
        <div className="form-group" key={name}>
          <div className='check-div'>
            {isValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
            <label>{label}</label>
          </div>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={placeholder}
          />
        </div>
      ))}

      <div className="password-constraints">
        <CheckCircleIcon style={{ color: passwordChecks.atLeastEightCharacters ? 'green' : '#D0D5DD', fontSize: '20px', marginRight: "5px" }} />
        Must be at least 8 characters
      </div>

      <div className="password-constraints">
        <CheckCircleIcon style={{ color: passwordChecks.hasSpecialCharacter ? 'green' : '#D0D5DD', fontSize: '20px', marginRight: "5px" }} />
        Must contain one special character
      </div>

      <button className="create-account-button" onClick={handleSignUp}>
        Get started
      </button>

      <GoogleSignInButton />

      <div className="sign-up-link">
        Already have an account? <a href="/">Log in</a>
      </div>
    </div>
  );
}

export default CreateAccountPage;
