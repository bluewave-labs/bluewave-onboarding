import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

import PropTypes from "prop-types";
import React, { useContext } from "react";

import { HelperLinkContext } from "../../../services/linksProvider";
import s from "./Card.module.scss";

const Card = ({
  card,
  index,
  dragging,
  draggingItemIndex,
  onDragStart,
  onDragEnd,
  onDrag,
}) => {
  const { toggleSettings, setItemToDelete, setIsPopupOpen } =
    useContext(HelperLinkContext);
  const { title, x, y } = card;

  const onDelete = () => {
    setItemToDelete(card);
    setIsPopupOpen(true);
  };

  const style = {
    position: dragging && draggingItemIndex === index ? "absolute" : "relative",
    top: draggingItemIndex === index ? `${y}px` : "initial",
    left: draggingItemIndex === index ? `${x - 24}px` : "initial",
    cursor: dragging ? "grabbing" : "grab",
    zIndex: dragging && draggingItemIndex === index ? "10000" : "0",
    backgroundColor: "#fff",
    boxShadow:
      dragging && draggingItemIndex === index ? "0 0 4px #00000029" : "",
  };

  return (
    <div style={{ height: "48px" }}>
      <ListItem
        onClick={(e) => toggleSettings(e, card)}
        secondaryAction={
          <IconButton
            style={{ fontSize: "0.6rem" }}
            onClick={onDelete}
            id='delete'
          >
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
        style={style}
      >
        <ListItemAvatar
          onMouseDown={(e) => onDragStart(e, index)}
          onMouseUp={onDragEnd}
          onMouseMove={onDrag}
          onDrop={onDragEnd}
          id='drag'
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
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.number,
    order: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  draggingItemIndex: PropTypes.number,
  onDragEnd: PropTypes.func,
  dragging: PropTypes.bool,
  index: PropTypes.number,
};

export default Card;
