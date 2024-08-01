import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";
import "./ButtonStyles.css";

const Button = ({ text='', onClick= () => {}, variant="contained", sx=null, disabled=false, buttonType='primary'}) => {
  const classname = 'button ' + buttonType;
    return (
    <MuiButton
      disableRipple
      variant={variant}
      className={classname}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
    >
      {text}
    </MuiButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  buttonType: PropTypes.oneOf(['primary', 'secondary-grey', 'secondary-purple', 'error'])
};

export default Button;
