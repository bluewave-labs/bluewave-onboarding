const { isValidHexColor } = require("./guide.helper");

const validateHintData = ({
  action,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
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

module.exports = validateHintData;
