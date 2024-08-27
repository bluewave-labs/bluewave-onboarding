import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import './RadioButtonStyles.css';
const CustomRadioIcon = styled('span')({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  });

const CustomRadioCheckedIcon = styled('span')({
    borderRadius: '50%',
    backgroundColor: 'var(--main-purple)',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff, #fff 28%, transparent 32%)',
    content: '""',
  },
});

function RadioButton({ 
    id, 
    name, 
    value, 
    label, 
    onChange, 
    onclick, 
    buttonSize = 'small', 
    color = 'var(--main-purple)', 
    checked = false, 
    enabled = true 
}) {
  const sizeClass = buttonSize === 'large' ? 'radio-large' : 'radio-small';

  const handleChange = (event) => {
    if (checked) {
      onChange({ target: { name, value: '' } });
    } else {
      onChange(event);
    }
  };

  return (
    <div className={`radio-button ${sizeClass}`}>
      <Radio
        id={id}
        name={name}
        value={value}
        disabled={!enabled}
        onChange={handleChange}
        size={buttonSize === 'large' ? 'large' : 'small'}
        checkedIcon={<CustomRadioCheckedIcon />}
        icon={<CustomRadioIcon />}
        checked={checked}
        onClick={onclick}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  enabled: PropTypes.bool,
  onChange: PropTypes.func,
  color: PropTypes.string,
  checked: PropTypes.bool,
};

export default RadioButton;
