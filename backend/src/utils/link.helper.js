const URL_REGEX =
  /(?:https?:\/\/(?:www\.)?|www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-\d@:%_+.~#?&//=]*)|(?:\/[a-zA-Z0-9@:%._+~#&//=]*)/gi;

const RELATIVE_URL_REGEX = /^([./?#]|[a-zA-Z0-9_-]+\/?)+$/;

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return RELATIVE_URL_REGEX.test(url);
  }
};

module.exports = {
  URL_REGEX,
  RELATIVE_URL_REGEX,
  validateUrl
};
