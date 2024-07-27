import React from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";


const CheckIcon = ({ size = 'medium', outline = true, color = 'var(--main-purple)' }) => {

  return (
    <div>
      {outline ? (
        <CheckCircleOutlinedIcon fontSize={size} sx={{ color: { color } }} />
      ) : (
        <CheckCircleIcon sx={{ color: { color } }} />
      )}
    </div>
  );
}

CheckIcon.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  outline: PropTypes.oneOf([true, false]),
  color: PropTypes.oneOf(['var(--main-purple)', 'var(--checkIcon-green)', 'var(--third-text-color)'])
};


export default CheckIcon
