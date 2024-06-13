import React from "react";
import './RadioButtonStyles.css';
import PropTypes from "prop-types"


export default function RadioBox({ type, size, style, enabled, text, changeHandler }) {
    const [selectedValue, setSelectedValue] = useState(!enabled)


    return (
    <>
        <input
            type={type}
            size={size}
            style={style}
            disabled={!enabled}
            onChange={changeHandler}
        />
        <label>{text}</label>
    </>


    )
}



RadioBox.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    style: PropTypes.object,
    enabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    changeHandler: PropTypes.func
}


RadioBox.defaultProps = {
    type: 'radio',
    size: 'small',
    style: {},
    enabled: true,
    text: "aaaaaa"
}