import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoTooltip = ({ text, title }) => {
  return (
    <Tooltip title={text}>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

InfoTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default InfoTooltip;
