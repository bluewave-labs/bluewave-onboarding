import React from 'react';
import PropTypes from 'prop-types';

const ContentHeader = ({ title }) => {
  return <h2 className="content-header">{title}</h2>;
};

ContentHeader.propTypes = {
  title: PropTypes.string,
};

export default ContentHeader;
