import { List } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import s from "./Card.module.scss";

const CardContainer = ({ children }) => {
  return <List className={s.card__container}>{children}</List>;
};

CardContainer.propTypes = {
  children: PropTypes.node,
};

export default CardContainer;
