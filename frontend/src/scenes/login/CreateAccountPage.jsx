import React, { useState } from 'react';
import './login.css'; 
import GoogleIconSvg from '../../assets/google-icon.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CreateAccountPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [atLeastEightCharacters, setAtLeastEightCharacters] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsNameValid(e.target.value.length > 0);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasSpecialCharacter(hasSpecialCharacterCheck(e.target.value));
    setAtLeastEightCharacters(atLeastEightCharactersCheck(e.target.value));
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const hasSpecialCharacterCheck = (password) => {
    const regex = /[!@#$%^&*-_]/;
    return regex.test(password);
  };

  const atLeastEightCharactersCheck = (password) => {
    return password.length >= 8;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return atLeastEightCharactersCheck(password) && hasSpecialCharacterCheck(password);
  };

  return (
    <body class="login-body"> 
    <div className="login-container">
      <h2 style={{marginBottom: "0px"}}>Create an account</h2>
      <h3>Start your 30-day free trial</h3>
      <div className="form-group">
      <div className='check-div'>
      {isNameValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
        <label>Name*:</label>  
        </div>
        <input
          type="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
      <div className='check-div'> 
      {isEmailValid && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
        <label>Email*:</label>     
        </div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
      <div className='check-div'>
      {isPasswordValid && <CheckCircleIcon style={{ color: 'green' , fontSize: '20px'}} />}
        <label>Password*:</label>
        </div>    
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Create your password"
        />

      </div>
        <div className="password-constraints">
          <CheckCircleIcon style={{ color: atLeastEightCharacters ? 'green' : '#D0D5DD', fontSize: '20px' , marginRight:"5px"}} />
          Must be at least 8 characters
        </div>
        <div className="password-constraints">
          <CheckCircleIcon style={{ color: hasSpecialCharacter ? 'green' : '#D0D5DD', fontSize: '20px', marginRight:"5px" }} />
          Must contain one special character
        </div>
      <button className="create-account-button">
        Get started
      </button>
      <button className="google-sign-in-button">
        <img src={GoogleIconSvg} alt="Google Icon" className="google-icon" /> Sign up with Google
      </button>
      <div className="sign-up-link">
        Already have an account? <a href="login">Log in</a>
      </div>
    </div>
    </body>
  );
}

export default CreateAccountPage;
