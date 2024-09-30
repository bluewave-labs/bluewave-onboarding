import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserTitle.module.scss'

const UserTitle = ({ fullName }) => {
  return (
    <div className={styles.title}>
      Hello, {fullName}
    </div>
  );
};

UserTitle.propTypes = {
  fullName: PropTypes.string.isRequired,
};

export default UserTitle;
