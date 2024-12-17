import React from "react";
import DropdownList from "../../DropdownList/DropdownList";
import CustomTextField from "../../TextFieldComponents/CustomTextField/CustomTextField";
import "./HintLeftContent.css";

const HintLeftContent = ({
  actionButtonText,
  actionButtonUrl,
  action,
  targetElement,
  tooltipPlacement,
  updateHintStates,
}) => {
  const handleActionButtonText = (event) => {
    updateHintStates("actionButtonText", event.target.value);
  };
  const handleActionButtonUrl = (event) => {
    updateHintStates("actionButtonUrl", event.target.value);
  };
  const handleActionChange = (newAction) => {
    if (newAction && newAction !== action) {
      updateHintStates("action", newAction);
    }
  };
  const handleTargetElement = (event) => {
    updateHintStates("targetElement", event.target.value);
  };
  const handleTooltipPlacement = (newAction) => {
    if (newAction && newAction !== tooltipPlacement) {
      updateHintStates("tooltipPlacement", newAction);
    }
  };

  return (
    <div className="left-content-container">
      <h2
        className="hint-label"
        style={{ marginTop: "16px", marginBottom: "8px" }}
      >
        Action
      </h2>
      <DropdownList
        actions={["No action", "Open URL", "Open URL in a new tab"]}
        onActionChange={handleActionChange}
        selectedActionString={action.toLowerCase()}
      />
      <h2 className="hint-label" style={{ marginBottom: 0, marginTop: "16px" }}>
        Action button url (can be relative)
      </h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={actionButtonUrl}
        onChange={handleActionButtonUrl}
      />
      <h2 className="hint-label" style={{ marginBottom: 0 }}>
        Action button text
      </h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={actionButtonText}
        onChange={handleActionButtonText}
      />
      <h2 className="hint-label" style={{ marginBottom: 0 }}>
        Target Element
      </h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={targetElement}
        onChange={handleTargetElement}
        helperText="Page element to attach tooltip to"
      />
      <h2 className="hint-label" style={{ marginBottom: "8px" }}>
        Tooltip Placement
      </h2>
      <DropdownList
        actions={["Top", "Right", "Bottom", "Left"]}
        onActionChange={handleTooltipPlacement}
        selectedActionString={tooltipPlacement}
      />
    </div>
  );
};

export default HintLeftContent;
