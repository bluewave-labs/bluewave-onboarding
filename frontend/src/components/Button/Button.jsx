import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";
import "./ButtonStyles.css";

const Button = ({ text='', onClick= () => {}, variant="contained", style=null, sx=null, disabled=false, buttonType='primary'}) => {
  const classname = 'button ' + buttonType;
    return (
    <MuiButton
      disableRipple
      variant={variant}
      className={classname}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
      style={style}
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
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'secondary-grey', 'secondary-purple', 'error'])
};

export default Button;
