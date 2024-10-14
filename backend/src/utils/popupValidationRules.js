
const isValidHexColor = (color) => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };
  
  const validatePopupSize = (value) => {
    const validSizes = ["small", "medium", "large"];
    return validSizes.includes(value);
  };
  
  const validateCloseButtonAction = (value) => {
    const validActions = ["no action", "open url", "open url in a new tab"];
    return validActions.includes(value);
  };
  
  const validatePopupData = (popupData) => {
    const errors = [];
  
    if (!popupData.popupSize) {
      errors.push({ msg: "popupSize is required" });
    } else if (!validatePopupSize(popupData.popupSize)) {
      errors.push({ msg: "Invalid value for popupSize" });
    }
  
    if (!popupData.closeButtonAction) {
      errors.push({ msg: "closeButtonAction is required" });
    } else if (!validateCloseButtonAction(popupData.closeButtonAction)) {
      errors.push({ msg: "Invalid value for closeButtonAction" });
    }
  
    const colorFields = [
      "headerBackgroundColor",
      "headerColor",
      "textColor",
      "buttonBackgroundColor",
      "buttonTextColor",
    ];
  
    for (const field of colorFields) {
      if (popupData[field] && !isValidHexColor(popupData[field])) {
        errors.push({ msg: `${field} must be a valid hex color code` });
      }
    }
  
    return errors;
  };
  
  const isValidId = (id) => {
    return !Number.isNaN(Number(id)) && id.trim() !== "";
  };
  
  module.exports = {
    validatePopupData,
    isValidId,
    isValidHexColor,
    validatePopupSize,
    validateCloseButtonAction,
  };