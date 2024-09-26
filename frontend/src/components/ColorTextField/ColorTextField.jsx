import styles from './ColorTextField.module.scss'
import { React } from 'react';
import { MuiColorInput } from 'mui-color-input'

const ColorTextField = ({ onChange = () => null, value = null }) => {
    return (
        <MuiColorInput
            className={styles.colorTextField}
            format="hex"
            isAlphaHidden={true}
            value={value}
            onChange={onChange}
        />
    )
}

export default ColorTextField;