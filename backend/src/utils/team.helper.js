const { URL_PROTOCOL_REGEX, URL_DOMAIN_REGEX } = require('./constants.helper');
const { check } = require('express-validator');

require('dotenv').config();

const validateServerUrl = url => {
  if (url === "") {
    return { valid: true, errors: null }
  }

  const errors = [];

  if (!URL_PROTOCOL_REGEX.test(url)) {
    errors.push("Invalid or missing protocol (must be 'http://' or 'https://').")
  }
  
  const domainMatch = url.match(URL_DOMAIN_REGEX);
  if (!domainMatch) {
    errors.push("Invalid domain name (must include a valid top-level domain like '.com').");
  } else {
    const domain = domainMatch[1];
    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
      errors.push(`Malformed domain: '${domain}'.`);
    }
  }

  if (errors.length === 0) {
    return { valid: true, errors: null }
  }

  return { valid: false, errors }
};

const validateSetServerUrl = [
  check('serverUrl')
    .optional({
      values: ["", null, undefined]
    })
    .isString().withMessage('Server URL must be a string')
    .trim()
    .custom(value => {
      const result = validateServerUrl(value);
      if (result.valid) {
        return true;
      }
      throw new Error(result.errors);
    })
];

module.exports = { validateSetServerUrl };