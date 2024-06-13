import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import './StyledButton.css';

const StyledButton = ({ text, onClick, style }) => {
  return (
    <Button className='styled-button' style={{ ...style }} variant="contained" onClick={onClick}>
      {text}
    </Button>
  );
};

StyledButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

StyledButton.defaultProps = {
  style: {},
};

export default StyledButton;
