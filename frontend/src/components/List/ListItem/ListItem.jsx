import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import './ListItem.css';

const ListItem = ({ title, text, id, onClick, onDelete, onEdit }) => {
  return (
    <div className="list-item" onClick={onClick}>
      <div className="list-item-info">
        <div className="list-item-header">
          <svg width="16" height="16" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-item-icon">
            <path d="M0 3C0 1.34315 1.34315 0 3 0V0C4.65685 0 6 1.34315 6 3V3C6 4.65685 4.65685 6 3 6V6C1.34315 6 0 4.65685 0 3V3Z" fill="#7F56D9"/>
          </svg>
          <h4>{title}</h4>
        </div>
        {text && <p>{text}</p>}
        {id && <p className="item-id">ID: {id}</p>}
      </div>
      <div className="list-item-actions">
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

ListItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ListItem;
