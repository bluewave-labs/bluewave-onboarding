import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import './../CustomLabelTagStyles.css';

const validateBackgroundColor = (props, propName, componentName) => {
  const validColors = ['orange', 'red', 'purple', 'white'];
  if (!validColors.includes(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
    );
  }
};

const CustomLabelTag = ({
  text,
  backgroundColor = 'white',
  textColor = 'black',
  className = '',
  ...props
}) => {
  return (
    <Chip
      label={text}
      style={{ backgroundColor, color: textColor }}
      className={`custom-label-tag ${backgroundColor} ${className}`}
      {...props}
    />
  );
};

CustomLabelTag.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: validateBackgroundColor,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default CustomLabelTag;