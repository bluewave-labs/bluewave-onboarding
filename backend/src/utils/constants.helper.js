module.exports = Object.freeze({
    JWT_EXPIRES_IN_1H: '1h',
    JWT_EXPIRES_IN_20M: '20m',
    TOKEN_LIFESPAN: 3600 * 1000,
    // API_BASE_URL: 'https://onboarding-demo.bluewavelabs.ca/api/',
    API_BASE_URL: 'localhost:3000/api/',
    MAX_FILE_SIZE: 3 * 1024 * 1024,
    ROLE: {
      ADMIN: '1',
      MEMBER: '2'
    },
    MAX_ORG_NAME_LENGTH: 100,
    ORG_NAME_REGEX: /^[a-zA-Z0-9\s\-_&.]+$/,
  }); 
  