import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './AvatarStyles.css';


const Avatar = ({ src, alt, size, className }) => {
   
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

Avatar.defaultProps = {
    size: 'medium',
    className: ''
};

export default Avatar;