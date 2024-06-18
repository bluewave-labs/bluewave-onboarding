import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";
import "./ButtonStyles.css";

const Button = ({ text, onClick, variant, className }) => {
  return (
    <MuiButton
      disableRipple
      variant={variant}
      className={`${className} custom-button`}
      onClick={onClick}
    >
      {text}
    </MuiButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: "contained",
  className: "",
};

export default Button;
