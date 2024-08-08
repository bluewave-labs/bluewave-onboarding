import { React } from 'react';
import CustomTextField from '../TextFieldComponents/CustomTextField/CustomTextField';
import CircleIcon from '@mui/icons-material/Circle';

const ColorTextField = ({onChange  = () => null, value = null}) => {
    return (
        <>
        <CustomTextField
        TextFieldWidth="100%"
        value={value}
        onChange={onChange}
        />
        <CircleIcon style={{ fontSize: '24px', color: value }} />
        </>
    )
}

export default ColorTextField;