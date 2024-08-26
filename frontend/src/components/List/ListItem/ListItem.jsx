import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import './ListItem.css';

const ListItem = ({ title, text, id, onClick, onDelete, onEdit }) => {
  const theme = useTheme();

  return (
    <div className="list-item" onClick={onClick}>
      <div className="list-item-info">
        <div className="list-item-header">
          <div className="list-item-icon-container">
            <CircleIcon className="list-item-icon" style={{ fill: theme.palette.primary.main }} />
            <div className="list-item-dot" style={{ backgroundColor: theme.palette.background.default }}></div>
          </div>
          <h4>{title}</h4>
        </div>
        {text && <p>{text}</p>}
        {id && <p className="item-id">ID: {id}</p>}
      </div>
      <div className="list-item-actions">
        <IconButton onClick={onEdit}>
          <EditIcon />
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
