import React from 'react';
import PropTypes from 'prop-types';
import './CustomLabelTagStyles.css';

const CustomLabelTag = ({
  text,
  type,
}) => {
  const labelClass = `label ${type}`;

  return (
    <span className={labelClass}>
      {['seen', 'waiting', 'new'].includes(type) && <span className="dot"></span>}
      {text}
    </span>
  );
};

const validateType = (props, propName, componentName) => {
  if (!['orange', 'gray', 'purple', 'green', 'seen', 'waiting', 'new'].includes(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
    );
  }
};

CustomLabelTag.propTypes = {
  text: PropTypes.string.isRequired,
  type: validateType,
};

export default CustomLabelTag;
