const constants = require('../../../shared/constants.json');

const validatePopupSize = (value) => {
  const validSizes = ["small", "medium", "large"];
  return validSizes.includes(value);
};

const validatePopupSizeWrapper = (value) => {
  if (!validatePopupSize(value)) {
    throw new Error('Invalid popup size');
  }
};

export const  convertButtonActionTextToEnum = (buttonAction) => {
  if (typeof buttonAction === 'string') {
    const actionTypeKey = Object.keys(constants.ACTIONS_NAMES).find(key => constants.ACTIONS_NAMES[key] === buttonAction);
    return constants.ACTIONS_TYPES[actionTypeKey] || constants.ACTIONS_TYPES.NO_ACTION
  }
  return buttonAction;
}

module.exports = {
  validatePopupSize,
  validatePopupSizeWrapper
};
