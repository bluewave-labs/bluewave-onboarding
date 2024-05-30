import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import './LogosStyles.css';

class Logo extends Component {
  constructor (props){
    super (props);
    this.state = {
      width:"",
      height:"",
    };
  }
 render() {
  return (
    <img src={logo.src} alt={logo.alt} className="logoImage" />
  )
 }
}

Logo.propTypes = {
  logo: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      className: PropTypes.string
    })
  ).isRequired
};
   
   export default Logo;