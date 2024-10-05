const validatePosition = (value) => {
  const validPositions = ["top", "bottom"];
  return validPositions.includes(value.toLowerCase());
};
  

  module.exports = {
    validatePosition,
  };