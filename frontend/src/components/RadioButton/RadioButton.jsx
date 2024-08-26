import React from "react";
import PropTypes from "prop-types";
import { Radio } from "@mui/material";
import './RadioButtonStyles.css';

const RadioButton = ({
    id,
    name,
    value,
    label,
    onChange,
    buttonSize = 'small',
    color = 'var(--main-purple)',
    checked = false,
    enabled = true,
}) => {
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
                style={{ color: color }}
                checked={checked}
            />
            {label && <label htmlFor={id}>{label}</label>}
        </div>
    );
};

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
