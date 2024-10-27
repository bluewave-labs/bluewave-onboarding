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

const Card = ({ id, title, url, order, toggleSettings }) => {
  const onClick = () => {
    toggleSettings({ id, title, url, order });
  };

  const onDelete = () => {};

  const onDrag = () => {};

  const onDragEnd = (e) => {};

  return (
    <ListItem
      secondaryAction={
        <IconButton style={{ fontSize: "0.6rem" }}>
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
    >
      <ListItemAvatar>
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
};

export default Card;
