import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button/Button';
import CheckIcon from '@mui/icons-material/Check'; // or use your checkicon component
import './CreateActivityButtonStyles.css';

//TODO: For Rusi . Analise the code. Make changes for the props and styles. This is just mockUp how it should be.

const CreateActivityButton = ({ buttonText, onClick, variant, className, icons }) => {
  return (
    <div className="activity-container">
      <div className="image-placeholder"></div>
      <div className="activity-icons">
        {icons && icons.map((item, index) => (
          <div key={index} className="activity-icons">
            <CheckIcon>{item.checkIconText}</CheckIcon>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <Button
        variant={variant}
        className={`${className} create-activity-button`}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

CreateActivityButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  className: PropTypes.string,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      checkIconText: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default CreateActivityButton;
