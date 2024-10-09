import React from "react";
import DropdownList from "../../DropdownList/DropdownList";
import CustomTextField from "../../TextFieldComponents/CustomTextField/CustomTextField";
import "./HintLeftContent.css";

const HintLeftContent = ({ setLeftContentFormData, formData }) => {
  
  const handleChange = (name) => (e) => {
    setLeftContentFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <div className="left-content-container">
      <h2 className="hint-label">Action</h2>
      <DropdownList
        actions={["No action", "Open a URL", "Open a URL in a new tab"]}
      />
      <h2 className="hint-label" style={{ marginBottom: 0 }}>
        Action button url (can be relative)
      </h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={formData.actionButtonUrl}
        onChange={handleChange("actionButtonUrl")}
      />
      <h2 className="hint-label" style={{ marginBottom: 0 }}>
        Action button text
      </h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={formData.actionButtonText}
        onChange={handleChange("actionButtonText")}
      />
      <h2 className="hint-label" style={{ marginBottom: 0 }}>
        Target Element
      </h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={formData.targetElement}
        onChange={handleChange("targetElement")}
        helperText="Page element to attach tooltip to"
      />
      <h2 className="hint-label">Tooltip Placement</h2>
      <DropdownList actions={["Top", "Right", "Bottom", "Left"]} />
    </div>
  );
};

export default HintLeftContent;
