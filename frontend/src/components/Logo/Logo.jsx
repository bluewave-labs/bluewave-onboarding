<<<<<<< Updated upstream

import React from 'react';
import PropTypes from 'prop-types';
=======
import React  from 'react';
import PropTypes from 'prop-types';
import Logo from "@mui/material";
>>>>>>> Stashed changes
import './LogoStyles.css';

const Logo = ({ logo }) => {
  return (
    <div className="logo-container">
<<<<<<< Updated upstream
        <img
          src={logo}
          alt={""}
          //className={`logo-image ${logo.className}`}
        />
     
    </div>
  );
};

export default Logo;
=======
      {logo.map((logo, index) => (
        <img
        key={index}
        src={logo.src}
        alt={logo.alt}
        className={`logo-image ${logo.className}`}
        />
      ))}
    </div>
  );
};

Logo.propTypes = {
  Logo: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      className: PropTypes.string
    })
  ).isRequired
};

export default Logo;
>>>>>>> Stashed changes
