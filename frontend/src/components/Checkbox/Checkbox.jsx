import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import './CheckboxStyles.css';

// label: to specify the text label associated with the checkbox.
// checked: to determine whether the checkbox is initially checked.
// onChange: to handle the change event when the checkbox is clicked.
// variant: to define the checkbox style (e.g., primary, secondary).
// className: to apply additional CSS classes.
// style: to apply inline styles.

const CustomCheckbox = ({
  label = '',
  checked = false,
  onChange = () => {},
  variant = 'primary',
  className = '',
  style = {},
  size = 'medium',
  indeterminate = false,
  childrenCheckboxes = []
}) => {
  const [childChecked, setChildChecked] = useState(childrenCheckboxes.map(() => false));
  const [isChecked, setIsChecked] = useState(checked);

  const handleParentChange = useCallback((event) => {
    const newChecked = event.target.checked;
    setChildChecked(childrenCheckboxes.map(() => newChecked));
    onChange(event);
  }, [childrenCheckboxes, onChange]);

  const handleChildChange = useCallback((index) => (event) => {
    const newChecked = [...childChecked];
    newChecked[index] = event.target.checked;
    setChildChecked(newChecked);
    onChange(event);
  }, [childChecked, onChange]);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const isIndeterminate = childChecked.some((child) => child !== childChecked[0]);

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={childrenCheckboxes.length > 0 ? childChecked.every(Boolean) : isChecked}
            onChange={childrenCheckboxes.length > 0 ? handleParentChange : handleChange}
            indeterminate={indeterminate || isIndeterminate}
            size={size}
            sx={{
              color: variant === 'primary' ? 'var(--main-purple)' : '#808080E5',
              '&.Mui-checked': {
                color: variant === 'primary' ? 'var(--main-purple)' : '#808080E5',
              },
              '&.MuiCheckbox-indeterminate': {
                color: variant === 'primary' ? 'var(--main-purple)' : '#808080E5',
              },
            }}
            className={`checkbox ${variant} ${className}`}
          />
        }
        label={label}
        style={style}
      />
      {childrenCheckboxes.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {childrenCheckboxes.map((childLabel, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={childChecked[index]}
                  onChange={handleChildChange(index)}
                  size={size}
                  sx={{
                    color: variant === 'primary' ? 'var(--main-purple)' : '#808080E5',
                    '&.Mui-checked': {
                      color: variant === 'primary' ? 'var(--main-purple)' : '#808080E5',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: variant === 'primary' ? 'var(--main-purple)' : '#808080E5',
                    },
                  }}
                />
              }
              label={childLabel}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  indeterminate: PropTypes.bool,
  childrenCheckboxes: PropTypes.arrayOf(PropTypes.string),
};

export default CustomCheckbox;