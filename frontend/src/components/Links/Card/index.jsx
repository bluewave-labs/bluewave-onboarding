import PropTypes from "prop-types";
import React from "react";
import s from "./Card.module.scss"

const CardContainer = ({ children }) => {
  return <div className={s.card__container}>{children}</div>;
};

CardContainer.propTypes = {
  children: PropTypes.node,
};

export default CardContainer;
