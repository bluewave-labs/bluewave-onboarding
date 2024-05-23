
import React from 'react';
import './Header.css'; 
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function Header({ user }) {
    const handleDropdownClick = () => {
        //
      };

  return (
    <div className="top-banner">
      <div className="logo">BlueWave Onboard</div>
      <div className="user-info">
      <img src="/vendetta.png" alt="User" className="user-picture" />
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role}</div>
        </div>
        <button className="dropdown-button" onClick={handleDropdownClick}>
            <KeyboardArrowDownOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
