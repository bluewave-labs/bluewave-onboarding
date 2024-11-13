import React from "react";
import PropTypes from "prop-types";
import { TextField, InputLabel } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChipAdornment from "../Chips/ChipAdornment";
import "./CustomTextFieldStyles.css";

const CustomTextField = ({
  id = "",
  name = "",
  checkCircleIconVisible = false,
  displayCheckCircleIcon = false,
  labelText = "",
  value = "",
  onChange = () => { },
  onBlur = () => { },
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
  type = "text",
  required = false,
  style,
  labelSubText,
  disabled = false,
  autofocus = false
}) => {
  return (
    <div style={style}>
      {!checkCircleIconVisible &&
        <div>
          <InputLabel sx={{ fontWeight: labelFontWeight, margin: 0 }}>{labelText}</InputLabel>
          {labelSubText && <InputLabel sx={{ fontWeight: '400', fontSize: '13px', margin: 0 }}>{labelSubText}</InputLabel>}
        </div>
      }
      {checkCircleIconVisible &&
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {displayCheckCircleIcon && <CheckCircleIcon style={{ color: 'green', fontSize: '20px' }} />}
          <InputLabel sx={{ fontWeight: labelFontWeight, margin: 0 }}>{labelText}</InputLabel>
          {labelSubText && <InputLabel sx={{ fontWeight: labelFontWeight, margin: 0 }}>{labelSubText}</InputLabel>}
        </div>
      }
      <TextField
        id={id}
        type={type}
        name={name}
        autoFocus={autofocus}
        onBlur={onBlur}
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
        disabled={disabled}
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
  onBlur: PropTypes.func,
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
  id: PropTypes.string,
  name: PropTypes.string,
  checkCircleIconVisible: PropTypes.bool,
  displayCheckCircleIcon: PropTypes.bool,
  textFieldMargin: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default CustomTextField;
