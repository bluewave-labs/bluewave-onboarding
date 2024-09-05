import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./DropdownList.css";

const DropdownList = ({
  actions = [],
  onActionChange,
  selectedActionIndex = 0,
  selectedActionString = ""
}) => {

  const [selectedAction, setSelectedAction] = useState('');

  useEffect(() => {
    const getInitialSelectedAction = () => {
      if (selectedActionString) {
        const index = actions.findIndex(action =>
          action.toLowerCase() === selectedActionString.toLowerCase()
        );
        return index !== -1 ? actions[index] : actions[0] || "";
      }
      return actions[selectedActionIndex] || "";
    };
    console.log(getInitialSelectedAction())
    console.log('asd')
    setSelectedAction(getInitialSelectedAction());
  }, [selectedActionString, actions, selectedActionIndex]);

  useEffect(() => {
    if (onActionChange) {
      onActionChange(selectedAction);
    }
  }, [selectedAction]);

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
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <MenuItem key={index} className="menuItem" value={action}>
              {action}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled className="menuItem">
            No Actions Available
          </MenuItem>
        )}
      </Select>
    </div>
  );
};

DropdownList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string),
  onActionChange: PropTypes.func,
  selectedActionIndex: PropTypes.number, // Index for the selected action
  selectedActionString: PropTypes.string, // String for the selected action
};

export default DropdownList;
