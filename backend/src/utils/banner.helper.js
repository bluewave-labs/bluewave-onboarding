const validatePosition = (value) => {
  const validPositions = ["top", "bottom"];
  return validPositions.includes(value.toLowerCase());
};

const validatePositionWrapper = (value) => {
  if (!validatePosition(value)) {
    throw new Error('Invalid position');
  }
};
  

  module.exports = {
    validatePosition,
    validatePositionWrapper
  };