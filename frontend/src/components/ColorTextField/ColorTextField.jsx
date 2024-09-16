import { React } from 'react';
import CustomTextField from '../TextFieldComponents/CustomTextField/CustomTextField';
import CircleIcon from '@mui/icons-material/Circle';

const ColorTextField = ({onChange  = () => null, value = null}) => {
    const handleColor = (event) => {
        let newText = event.target.value;
        if (!newText.startsWith('#')) {
            newText = '#' + newText;
        }
        onChange(newText);
        
    }
    return (
        <>
        <CustomTextField
        TextFieldWidth="100%"
        value={value}
        onChange={handleColor}
        />
        <CircleIcon style={{ fontSize: '24px', color: value, marginLeft: '10px' }} />
        </>
    )
}

export default ColorTextField;