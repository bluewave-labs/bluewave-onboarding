import React from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';


export default function CheckIcon({size, outline, color}) {
  return (
    <div>
        {outline ? <CheckCircleOutlinedIcon fontSize={size} sx={{ color: {color} }}/> : <CheckCircleIcon sx={{ color: {color} }}/>}
    </div>
  );
}

CheckIcon.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    outline: PropTypes.oneOf(true, false),
    color: PropTypes.oneOf(['#7F56D9', '#475467', '#079455'])
} 

CheckIcon.defaultProps = {
    size: 'medium',
    outline: true,
    color: '#7F56D9'
}