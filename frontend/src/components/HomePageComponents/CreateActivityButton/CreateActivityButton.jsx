import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import { activityButtonStyles } from './ActivityButtonStyles';

const CreateActivityButton = ({ placeholder = '', onButtonClick = () => {} }) => {

  const icon = placeholder === 'Create a welcome tour' 
    ? <DirectionsBusFilledOutlinedIcon style={activityButtonStyles.icon} /> 
    : <WbIncandescentOutlinedIcon style={activityButtonStyles.icon} />;

  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onButtonClick}
      sx={{
        ...activityButtonStyles.button
      }}
    >
      {placeholder}
    </Button>
  );
};

CreateActivityButton.propTypes = {
  placeholder: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default CreateActivityButton;
