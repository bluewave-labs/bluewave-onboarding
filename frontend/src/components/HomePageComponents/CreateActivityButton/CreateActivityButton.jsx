import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

// Define the CreateActivityButton component
const CreateActivityButton = ({ placeholder = 'placeholder', onButtonClick = () => {} }) => {
  const icon = placeholder === 'Create a welcome tour' 
    ? <DirectionsBusFilledOutlinedIcon style={{ color: '#667085', fontSize:'2rem' }} /> 
    : <WbIncandescentOutlinedIcon style={{ color: '#667085', fontSize:'2rem' }} />;

  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onButtonClick}
      sx={{
        backgroundColor: '#FFFAFA',
        ':hover': { backgroundColor: 'orange' },
        color: '#344054',
        border: '1px solid #FFD8C7',
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

// Define propTypes for the component
CreateActivityButton.propTypes = {
  placeholder: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default CreateActivityButton;
