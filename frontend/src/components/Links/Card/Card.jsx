import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

import s from "./Card.module.scss";
import { deleteLink } from "../../../services/linkService";

const Card = ({
  id,
  title,
  url,
  order,
  toggleSettings,
  onDragStart,
  onDragEnd,
  index,
  x,
  y,
  dragging,
  draggingItemIndex,
  onDrag,
}) => {
  const onClick = () => {
    toggleSettings({ id, title, url, order });
  };

  const onDelete = async () => {
    const deleted = await deleteLink(id);
    if (deleted) {
      location.reload();
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton style={{ fontSize: "0.6rem" }} onClick={onDelete}>
          <SvgIcon fontSize='1'>
            <svg
              width='9'
              height='9'
              viewBox='0 0 9 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 1L1 8M1 1L8 8'
                stroke='#747474'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </SvgIcon>
        </IconButton>
      }
      style={{
        position:
          dragging && draggingItemIndex === index ? "absolute" : "relative",
        top: draggingItemIndex === index ? `${y}px` : "initial",
        left: draggingItemIndex === index ? `${x}px` : "initial",
        cursor: dragging ? "grabbing" : "grab",
        zIndex: dragging && draggingItemIndex === index ? "10000" : "0",
        backgroundColor: "#fff"
      }}
    >
      <ListItemAvatar
        onMouseDown={(e) => onDragStart(e, index)}
        onMouseUp={onDragEnd}
        onMouseMove={onDrag}
        onDrop={onDragEnd}
      >
        <IconButton style={{ fontSize: "1rem" }}>
          <SvgIcon className={s.card__icon} fontSize='1'>
            <svg
              width='14'
              height='15'
              viewBox='0 0 14 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 5.33333H1M13 14H1M13 1H1M13 9.66667H1'
                stroke='#747474'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </SvgIcon>
        </IconButton>
      </ListItemAvatar>
      <ListItemText primary={title} />
    </ListItem>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.number,
  order: PropTypes.number,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  toggleSettings: PropTypes.func,
  draggingItemIndex: PropTypes.number,
  onDragEnd: PropTypes.func,
  index: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  dragging: PropTypes.bool,
};

export default Card;
