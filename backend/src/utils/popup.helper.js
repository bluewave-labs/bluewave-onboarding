const validatePopupSize = (value) => {
  const validSizes = ["small", "medium", "large"];
  return validSizes.includes(value);
};

const validatePopupSizeWrapper = (value) => {
  if (!validatePopupSize(value)) {
    throw new Error('Invalid popup size');
  }
};



module.exports = {
  validatePopupSize,
  validatePopupSizeWrapper
};
