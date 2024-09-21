import { React } from 'react';
import { MuiColorInput } from 'mui-color-input'

const ColorTextField = ({ onChange = () => null, value = null }) => {
    return (
        <MuiColorInput format="hex" isAlphaHidden="true" value={value} onChange={onChange} />
    )
}

export default ColorTextField;