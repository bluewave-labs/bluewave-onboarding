
import React from 'react';
import PropTypes from 'prop-types';
import './LogoStyles.css';

const Logo = ({ logo }) => {
  return (
    <div className="logo-container">
        <img
          src={logo}
          alt={""}
          //className={`logo-image ${logo.className}`}
        />
     
    </div>
  );
};

export default Logo;
