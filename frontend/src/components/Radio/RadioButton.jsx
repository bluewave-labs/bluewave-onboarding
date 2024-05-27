import Radio from '@mui/material/Radio';
import {styled} from '@mui/system';
import PropTypes from 'prop-types';

export default function MUIRadio({id, size, value, enabled}) {
    const StyledRadio = styled(Radio)({
        color: "#D0D5DD",
        "&.Mui-checked": {
            color: "#7F56D9"
        }
    });

    return (
        <StyledRadio id={id} size={size} value={value} disabled={!enabled} />
    );
}

