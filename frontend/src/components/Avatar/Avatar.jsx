import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './AvatarStyles.css';


const Avatar = ({ src, alt, size = 'medium', className }) => {
   
    const defaultClasses = classNames(
        'avatar-container', 
        {
            [`avatar-${size}`]: size 
        },
        className 
    );

    return (
        <img src={src} alt={alt} className={defaultClasses} />
    );
}
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string, 
};


export default Avatar;