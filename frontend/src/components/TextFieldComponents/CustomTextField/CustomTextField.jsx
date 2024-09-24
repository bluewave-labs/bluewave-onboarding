import React from "react";
import PropTypes from "prop-types";
import { TextField, InputLabel } from "@mui/material";
import ChipAdornment from "../Chips/ChipAdornment";
import "./CustomTextFieldStyles.css";

const CustomTextField = ({
  labelText = "",
  value = "",
  onChange = () => {},
  helperText = "",
  error = false,
  multiline = false,
  rows = 1,
  startAdornment = null,
  endAdornment = null,
  placeholder = "",
  chips = null,
  labelFontWeight = 600,
  TextFieldWidth = "320px",
  inputHeight = "34px",
  textFieldMargin = "normal",
  type="text",
  required = false,
  style
}) => {
  return (
    <div style={style}>
      <InputLabel sx={{ fontWeight: labelFontWeight, margin: 0 }}>{labelText}</InputLabel>
      <TextField
        type={type}
        required={Boolean(required)}
        className="textField"
        sx={{ width: TextFieldWidth }}
        fullWidth
        margin={textFieldMargin}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        multiline={multiline}
        rows={rows}
        helperText={helperText}
        InputProps={{
          startAdornment: startAdornment,
          endAdornment: endAdornment,
          ...(chips &&
            chips.length > 0 && {
              startAdornment: <ChipAdornment chips={chips} />,
            }),
        }}
        inputProps={{
          style: {
            height: inputHeight,
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
        FormHelperTextProps={{
          sx: { margin: 0, paddingTop: 1 },
        }}
      />
    </div>
  );
};

CustomTextField.propTypes = {
  labelText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  placeholder: PropTypes.string,
  chips: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onDelete: PropTypes.func,
    })
  ),
  labelFontWeight: PropTypes.number,
  TextFieldWidth: PropTypes.string,
  inputHeight: PropTypes.string,
};

export default CustomTextField;
