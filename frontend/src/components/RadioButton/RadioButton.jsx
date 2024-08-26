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
    onclick,
    sx,
    buttonSize = 'small',
    color = 'var(--main-purple)',
    checked = false,
    enabled = true,
    
}) => {
    const sizeClass = buttonSize === 'large' ? 'radio-large' : 'radio-small';
    return (
        <div className={`radio-button ${sizeClass}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio                
                id={id}                
                name={name}
                value={value}            
                disabled={!enabled}
                onChange={onChange}
                size={buttonSize === 'large' ? 'large' : 'small'}
                style={{ color: color }}
                checked={checked}
                onclick={onclick}
                sx={sx}
            />
            {label && <label htmlFor={id} style={{ cursor: 'pointer' }}>{label}</label>}
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
