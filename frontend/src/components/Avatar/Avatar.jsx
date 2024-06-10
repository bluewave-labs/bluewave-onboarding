import React from 'react';
import PropTypes from 'prop-types';
import './AvatarStyles.css';


const Avatar = ({ src, alt, size, className }) {
    const sizeofAvatar = size ? `avatar-${size}` : '';
    return (
        <div className={`avatar-container ${sizeofAvatar} ${className}`}>
        <img src={src} alt={alt} className='avatar-image'/>
        </div>
    );}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small','medium', 'large']),
    className: PropTypes.string,
};

export default Avatar;