import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./DropdownList.css";

const DropdownList = ({ actions = [], onActionChange }) => {
  const [selectedAction, setSelectedAction] = useState(actions[0] || "");

  useEffect(() => {
    if (onActionChange) {
      onActionChange(selectedAction);
    }
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedAction(newValue);
    if (onActionChange) {
      onActionChange(newValue);
    }
  };

  return (
    <div className="dropdown">
      <Select
        value={selectedAction}
        onChange={handleChange}
        className="select"
      >
        {actions.map((action, index) => (
          <MenuItem key={index} className="menuItem" value={action}>
            {action}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

DropdownList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string),
  onActionChange: PropTypes.func, // Function to handle action change
};

export default DropdownList;
