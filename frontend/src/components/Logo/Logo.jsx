import React from 'react';
import PropTypes from 'prop-types';
import './LogoStyles.css';
import logo from 'frontend/src/assets/logo/logo.png';
function Logo({ isSidebar = false }) {
    return (
        <div className={isSidebar ? 'sidebar' : 'logo-container'}>
            <img src={logo} alt="Company Logo" width={346} height={32} />
        </div>
    );
}

Logo.propTypes = {
    isSidebar: PropTypes.bool
};

export default Logo;
