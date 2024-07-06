import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserTitle.module.scss'

const UserTitle = ({ userName }) => {
  return (
    <div className={styles.title}>
      Hello, {userName}
    </div>
  );
};

UserTitle.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default UserTitle;
