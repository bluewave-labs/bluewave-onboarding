const { STATUS_CODES } = require("http");
const GENERAL_ERROR_CODE = "099";

function errorResponse(statusCode, errorCode, message = null) {
  const payload = { error: STATUS_CODES[statusCode] || "Unknown error" };
  if (message) {
    payload.message = message;
  }
  if (errorCode) {
    payload.errorCode = errorCode;
  }
  return {
    statusCode,
    payload,
  };
}

function badRequest(message, errorCode = GENERAL_ERROR_CODE) {
  return errorResponse(400, errorCode, message);
}

function internalServerError(errorCode, message = null) {
  return errorResponse(500, errorCode, message);
}

module.exports = {
  errorResponse,
  badRequest,
  internalServerError,
};
