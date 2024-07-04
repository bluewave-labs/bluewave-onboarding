import React from "react";
import PropTypes from "prop-types";
import { TextField, Chip, Box, InputLabel } from "@mui/material";
import "./TextFieldStyles.css";

const CustomTextField = ({
  labelText,
  defaultValue,
  helperText,
  error,
  multiline,
  rows,
  startAdornment,
  endAdornment,
  placeholder,
  chips,
  labelFontWeight,
  TextFieldWidth,
  inputHeight,
}) => {
  return (
    <Box paddingY={1}>
      <InputLabel className="label" sx={{ fontWeight: labelFontWeight }}>
        {labelText}
      </InputLabel>
      <TextField
        className="textField"
        sx={{ width: TextFieldWidth }}
        fullWidth
        margin="normal"
        defaultValue={defaultValue}
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
              startAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: -15,
                    mr: 1,
                  }}
                >
                  {chips.map((chip, index) => (
                    <Chip
                      key={index}
                      label={chip.label}
                      onDelete={chip.onDelete}
                      variant="outlined"
                      sx={{ borderRadius: "5px" }}
                    />
                  ))}
                </Box>
              ),
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
    </Box>
  );
};

// Explanation of the PropTypes used in this file
/*
- labelText (string): A label that describes the content of the text field.
- defaultValue (string): A default value for when the input is still empty.
- helperText (string): The text that will be displayed as the helper text for the text field.
- error (bool): A boolean value that determines whether the text field should display an error state.
- multiline (bool): A boolean value that determines whether the text field should allow multiple lines of text.
- rows (number): The number of rows that the text field should display when in multiline mode.
- startAdornment (node): The node that will be displayed as the start adornment for the text field.
- endAdornment (node): The node that will be displayed as the end adornment for the text field.
- placeholder (string): The short hint displayed in the input before the user enters a value.
- chips (array): An array of objects that represent chips to be displayed in the text field.
- labelFontWeight (number): The font weight of the label text.
- TextFieldWidth (string): The width of the text field.
- inputHeight (string): The height of the input field.
*/

CustomTextField.defaultProps = {
  labelText: "",
  defaultValue: "",
  helperText: "",
  error: false,
  multiline: false,
  rows: 1,
  chips: [],
  startAdornment: null,
  endAdornment: null,
  placeholder: "",
  labelFontWeight: 600,
  TextFieldWidth: "100%",
  inputHeight: "56px",
};

CustomTextField.propTypes = {
  labelText: PropTypes.string,
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
