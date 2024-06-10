import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";
import "./ButtonStyles.css";

const Button = ({ text, onClick, variant, className, style, sx }) => {
  return (
    <MuiButton
      disableRipple
      variant={variant}
      className={className}
      onClick={onClick}
      style={style}
      sx={sx}
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
  style: PropTypes.object,
  sx: PropTypes.object,
};

Button.defaultProps = {
  variant: "contained",
  className: "",
  style: {},
  sx: {},
};

export default Button;
