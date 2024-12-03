const jwt = require('jsonwebtoken');
const { URL_PROTOCOL_REGEX, URL_DOMAIN_REGEX } = require('./constants.helper');

require('dotenv').config();

const encryptApiKey = (apiKey) => {
  return jwt.sign(apiKey, process.env.API_KEY_ENCRYPTION_KEY);
};

const decryptApiKey = (apiKey) => {
  try {
    return jwt.verify(apiKey, process.env.API_KEY_ENCRYPTION_KEY);
  } catch (err) {
    return null;
  }
}

const validateServerUrl = url => {
  const errors = [];

  if (url === "") {
    return { valid: true, error: null }
  }

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

module.exports = { encryptApiKey, decryptApiKey, validateServerUrl };