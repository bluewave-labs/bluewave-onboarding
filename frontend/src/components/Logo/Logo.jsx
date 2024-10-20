import React from 'react';
import PropTypes from 'prop-types';
import styles from './LogoStyles.module.css';

const Logo = ({ isSidebar = false, logoText = 'BlueWave', highlightText = 'Onboard' }) => {
    const containerClass = isSidebar ? styles.sidebar : styles.logoContainer;
    
    return (
        <div className={containerClass}>
            <span className={styles.logoText}>{logoText}&nbsp;</span>
            <span className={styles.logoTextPurple}>{highlightText}</span>
        </div>
    );
};

Logo.propTypes = {
    isSidebar: PropTypes.bool,
    logoText: PropTypes.string,
    highlightText: PropTypes.string,
};

export default Logo;
