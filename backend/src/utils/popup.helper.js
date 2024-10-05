const validatePopupSize = (value) => {
  const validSizes = ["small", "medium", "large"];
  return validSizes.includes(value);
};

module.exports = {
  validatePopupSize,
};
