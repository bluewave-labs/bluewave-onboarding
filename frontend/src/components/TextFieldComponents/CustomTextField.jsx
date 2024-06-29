import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  Chip,
  Box,
  InputLabel,
} from "@mui/material";

const CustomTextField = ({
  label,
  defaultValue,
  helperText,
  error,
  multiline,
  rows,
  startAdornment,
  endAdornment,
  placeholder,
  chips,
  labelText,
}) => {
  return (
    <Box paddingY={2}>
      <InputLabel sx={{ fontWeight: "bold" }}>{labelText}</InputLabel>
      <TextField
        label={label}
        fullWidth
        margin="normal"
        defaultValue={defaultValue}
        placeholder={placeholder}
        error={error}
        multiline={multiline}
        rows={rows}
        helperText={helperText}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
          ...(chips && {
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: -9,
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
              </InputAdornment>
            ),
          }),
        }}
        FormHelperTextProps={{
          sx: { margin: 0, paddingTop: 1 },
        }}
      />
    </Box>
  );
};

CustomTextField.propTypes = {
  label: PropTypes.string,
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
      label: PropTypes.string.isRequired,
      onDelete: PropTypes.func.isRequired,
    })
  ),
  labelText: PropTypes.string,
};

export default CustomTextField;
