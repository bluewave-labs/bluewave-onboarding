const validateTriggeringFrequency = (value) => {
  const validFrequencies = [
    "just once",
    "once in every session",
    "once every day",
    "once every week",
    "once every month",
    "always",
  ];
  return validFrequencies.includes(value.toLowerCase());
};

const validatePageTargeting = (value) => {
  const validPageTargetingValues = ["equals to", "is different from"];
  return validPageTargetingValues.includes(value.toLowerCase());
};

const validateTheme = (value) => {
  const validThemes = ["default theme"];
  return validThemes.includes(value.toLowerCase());
};

module.exports = {
  validateTriggeringFrequency,
  validatePageTargeting,
  validateTheme,
};
