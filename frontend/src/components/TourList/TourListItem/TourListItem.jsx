import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const TourListItem = ({ title, timestamp, onClick, onDelete, onEdit }) => {
  return (
    <div className="tour-list-item" onClick={onClick}>
      <div className="tour-list-item-info">
        <h4>{title}</h4>
        <p>{timestamp}</p>
      </div>
      <div className="tour-list-item-actions">
        <IconButton onClick={onEdit}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

TourListItem.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TourListItem;
