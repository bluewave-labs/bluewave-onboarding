import React from "react";
import './RadioButtonStyles.css';
import PropTypes from "prop-types";
import { Radio } from "@mui/material";

const RadioButton = ({
    id,
    name,
    value,
    label,
    onChange,
    buttonSize = 'small',
    color = 'default',
    enabled = true,
}) => {
    const main_purple = 'var(--main-purple)';
    const sizeClass = buttonSize ==='large' ? 'radio-large' : 'radio-small';
    return (
        <div className={`radio-button ${sizeClass}`}>
            <Radio                
                id={id}                
                name = {name}
                value={value}            
                disabled={!enabled}
                onChange={onChange}
                size={buttonSize === 'large' ? 'large' : 'small'}
                style={{ color: color === 'default' ? main_purple : color }}
            />
            { label && <label htmlFor={id}>{label}</label> }
        </div >
    );
};

RadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    onchange: PropTypes.func,
    color: PropTypes.string,
};

export default RadioButton;