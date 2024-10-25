import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, SvgIcon, useTheme } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

import s from "./Card.module.scss";

const Card = ({ id, title, url, order, toggleSettings }) => {
  const theme = useTheme();

  const onClick = () => {
    toggleSettings({id, title, url, order})
  };

  const onDelete = () => {};

  const onDrag = () => {};

  return (
    <div className={s.card} onClick={onClick} onDragEnd={onDrag}>
      <div className={s.card__info}>
        <div className={s.card__header}>
          <div className={s["card__icon-container"]}>
            <SvgIcon
              className={s.card__icon}
              style={{ fill: theme.palette.primary.main }}
            >
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
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </SvgIcon>
          </div>
          <h4>{title}</h4>
        </div>
      </div>
      <div className={s.card__actions}>
        <IconButton onClick={onDelete}>
          X
        </IconButton>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.number,
};

export default Card;
