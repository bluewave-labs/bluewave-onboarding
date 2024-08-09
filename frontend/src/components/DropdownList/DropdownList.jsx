import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import PropTypes from "prop-types";
import "./DropdownList.css";

const DropdownList = ({ actions = [] }) => {
  return (
    <div className="dropdown">
      <Select defaultValue={actions[0]} className="select">
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
  actions: PropTypes.array,
};

export default DropdownList;
