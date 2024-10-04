const validatePosition = (value) => {
    const validPositions = ["top", "bottom"];
    return validPositions.includes(value);
  };
  
  const validateCloseButtonAction = (value) => {
    const validActions = ["no action", "open url", "open url in a new tab"];
    return validActions.includes(value);
  };

  module.exports = {
    validatePosition,
    validateCloseButtonAction,
  };