const { isValidHexColor } = require("./guide.helper");

const validateHintData = ({
  action,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
  tooltipPlacement
}) => {
  const errors = [];

  // Validate action
  if (!action) {
    errors.push({ msg: "action is required" });
    return errors;
  }

  const validActions = ["no action", "open url", "open url in a new tab"];
  if (!validActions.includes(action)) {
    errors.push({ msg: "Invalid value for action" });
    return errors;
  }

  if (!tooltipPlacement) {
    errors.push({ msg: "tooltipPlacement is required" });
  } else {
    const validPlacements = ['top', 'bottom', 'left', 'right']; // Add valid placements
    if (!validPlacements.includes(tooltipPlacement)) {
      errors.push({ msg: "Invalid tooltip placement" });
    }
  }

  // Validate color fields
  const colorFields = {
    headerBackgroundColor,
    headerColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
  };

  for (const [field, value] of Object.entries(colorFields)) {
    if (value && !isValidHexColor(value)) {
      errors.push({ msg: `Invalid value for ${field}` });
    }
  }

  return errors;
};

const validateId = (id) => {
  if (Number.isNaN(Number(id)) || !id || id.trim() === "") {
    return [{ msg: "Invalid hint ID" }];
  }
  return [];
};


module.exports = {validateHintData:validateHintData,validateId:validateId
}
