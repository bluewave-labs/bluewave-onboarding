import React from 'react';
import PropTypes from 'prop-types';

const TourDescriptionText = ({ description }) => {
  return <p className="tour-description-text">{description}</p>;
};

TourDescriptionText.propTypes = {
  description: PropTypes.string,
};

export default TourDescriptionText;
