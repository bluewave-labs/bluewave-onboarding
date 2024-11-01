const { internalServerError } = require('./errors.helper');
const { isValidHexColor, checkColorFieldsFail, validateCloseButtonAction } = require("./guide.helper");

const validatePosition = (value) => {
  const validPositions = ["top", "bottom"];
  return validPositions.includes(value.toLowerCase());
};

const validatePositionWrapper = (value) => {
  if (!validatePosition(value)) {
    return [{ msg: 'Invalid position' }];
  }
  return null;
};

const validateId = (id) => {
  if (Number.isNaN(Number(id)) || !id || id.trim() === "") {
    return [{ msg: "Invalid id" }];
  }
  return null;
};

const addBannerValidation = (req, res, next) => {
  const { position, closeButtonAction, fontColor, backgroundColor } = req.body;
  const errors = [];

  if (!position || !closeButtonAction) {
    errors.push({ msg: "Position and closeButtonAction are required" });
  }

  const positionErrors = validatePositionWrapper(position);
  if (positionErrors) {
    errors.push(...positionErrors);
  }

  if (!validateCloseButtonAction(closeButtonAction)) {
    errors.push({ msg: "Invalid closeButtonAction value" });
  }

  const colorFields = { fontColor, backgroundColor };
  const colorErrors = checkColorFieldsFail(colorFields);
  if (colorErrors) {
    errors.push(...colorErrors);
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  console.log(errors)
  next();
};

const deleteBannerValidation = (req, res, next) => {
  const { id } = req.params;
  const idErrors = validateId(id);
  
  if (idErrors) {
    return res.status(400).json({ errors: idErrors });
  }
  
  next();
};

const editBannerValidation = (req, res, next) => {
  const { id } = req.params;
  const { position, closeButtonAction, fontColor, backgroundColor } = req.body;
  const errors = [];

  const idErrors = validateId(id);
  if (idErrors) {
    errors.push(...idErrors);
  }

  if (!position || !closeButtonAction) {
    errors.push({ msg: "Position and closeButtonAction are required" });
  }

  const positionErrors = validatePositionWrapper(position);
  if (positionErrors) {
    errors.push(...positionErrors);
  }

  if (!validateCloseButtonAction(closeButtonAction)) {
    errors.push({ msg: "Invalid closeButtonAction value" });
  }

  const colorFields = { fontColor, backgroundColor };
  const colorErrors = checkColorFieldsFail(colorFields);
  if (colorErrors) {
    errors.push(...colorErrors);
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const getBannerByIdValidation = (req, res, next) => {
  const { id } = req.params;
  const idErrors = validateId(id);
  
  if (idErrors) {
    return res.status(400).json({ errors: idErrors });
  }
  
  next();
};

class ErrorHandler {
  static async handleAsync(res, operation, errorType) {
    try {
      const result = await operation();
      return result;
    } catch (err) {
      console.error(`${errorType}: `, err);
      const { statusCode, payload } = internalServerError(errorType, err.message);
      res.status(statusCode).json(payload);
      return null;
    }
  }
}

module.exports = {
  ErrorHandler,
  validatePosition,
  validatePositionWrapper,
  addBannerValidation,
  deleteBannerValidation,
  editBannerValidation,
  getBannerByIdValidation
};