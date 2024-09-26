const isValidHexColor = (value) => {
    const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    return hexColorRegex.test(value);
};

const validateHexColor = (value, fieldName) => {
    if (!isValidHexColor(value)) {
        throw new Error(`${fieldName} must be a valid hex color code`);
    }
};

const checkColorFields = (colorFields) => {
    for (const [field, value] of Object.entries(colorFields)) {
        if (value && !isValidHexColor(value)) {
          return res
            .status(400)
            .json({
              errors: [{ msg: `${field} must be a valid hex color code` }],
            });
        }
      }
}

module.exports = {
    isValidHexColor,
    validateHexColor,
    checkColorFields
};