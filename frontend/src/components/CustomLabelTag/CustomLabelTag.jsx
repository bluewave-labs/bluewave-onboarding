import React from 'react';
import PropTypes from 'prop-types';
import './CustomLabelTagStyles.css';

const validateBackgroundColor = (props, propName, componentName) => {
  if (!['orange', 'gray', 'purple', 'green', 'seen', 'waiting', 'new'].includes(props[propName])) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
    );
  }
};

const CustomLabelTag = ({ 
  text, 
  backgroundColor = 'white', 
  textColor = '', 
  className = '' 
}) => {
  const labelClass = `label label-${backgroundColor} ${className}`;

  return (
    <span className={labelClass} style={{ color: textColor }}>
      {['seen', 'waiting', 'new'].includes(backgroundColor) && <span className="dot"></span>}
      {text}
    </span>
  );
};

CustomLabelTag.propTypes = {
  text: PropTypes.string,
  backgroundColor: validateBackgroundColor,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default CustomLabelTag;
