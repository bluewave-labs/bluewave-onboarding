import React from 'react';
import PropTypes from 'prop-types';

const UserTitle = ({ userName }) => {
  return (
    <div>
      Hello, {userName}
    </div>
  );
};

UserTitle.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default UserTitle;
