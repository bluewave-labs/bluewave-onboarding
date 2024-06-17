import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

const CreateActivityButton = ({ placeholder = '', onButtonClick = () => {} }) => {
 
  // Define color constants
  const iconColor = '#667085';
  const hoverColor = 'orange';
  const textColor = '#344054';
  const borderColor = '#FFD8C7';
  const buttonBackgroundColor = '#FFFAFA';

  const iconStyles = { color: iconColor, fontSize: '2rem' };
  const icon = placeholder === 'Create a welcome tour' 
    ? <DirectionsBusFilledOutlinedIcon style={iconStyles} /> 
    : <WbIncandescentOutlinedIcon style={iconStyles} />;

  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onButtonClick}
      sx={{
        backgroundColor: buttonBackgroundColor,
        ':hover': { backgroundColor: hoverColor },
        color: textColor,
        border: '1px solid ' + borderColor,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        textTransform: 'none', 
        padding: '1.3rem 3rem', 
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 'fit-content',
        boxShadow: 'none', 
        borderRadius: '10px',
        gap:'1rem',
        width: `100%`
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
