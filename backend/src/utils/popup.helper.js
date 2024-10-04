const validatePopupSize = (value) => {
    const validSizes = ["small", "medium", "large"];
    return validSizes.includes(value);
  };
  
  const validateCloseButtonAction = (value) => {
    const validActions = ["no action", "open url", "open url in a new tab"];
    return validActions.includes(value);
  };

    module.exports = {
    validatePopupSize,
    validateCloseButtonAction,
    };