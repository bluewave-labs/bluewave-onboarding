import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './AvatarStyles.css';


const Avatar = ({ src, alt, size, className }) => {
    const sizeofAvatar = classNames('avatar-container',`avatar-${size}`, className);
    return (
        <img src={src} alt={alt} className={sizeofAvatar}/>
    );}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small','medium', 'large']),
    className: PropTypes.string,
};

export default Avatar;