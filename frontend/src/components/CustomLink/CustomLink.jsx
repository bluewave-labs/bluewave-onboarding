import React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import './CustomLinkStyles.css';

const CustomLink = ({
  text = 'Default Text',
  url = '#',
  className = '',
  underline = 'none',
}) => {
  return (
    <Link
      href={url}
      className={`custom-link ${className}`}
      underline={underline}
    >
      {text}
    </Link>
  );
};

CustomLink.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  underline: PropTypes.oneOf(['none', 'hover', 'always']),
};
export default CustomLink;
