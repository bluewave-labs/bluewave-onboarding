module.exports = Object.freeze({
    JWT_EXPIRES_IN_1H: '1h',
    JWT_EXPIRES_IN_20M: '20m',
    TOKEN_LIFESPAN: 3600 * 1000,
    // API_BASE_URL: 'https://onboarding-demo.bluewavelabs.ca/api/',
    API_BASE_URL: 'localhost:3000/api/',
    ROLE: {
      ADMIN: '1',
      MEMBER: '2'
    },
    ACTIONS: {
        NO_ACTION: 1,
        OPEN_URL: 2,
        OPEN_URL_IN_NEW_TAB: 3,
        CLOSE_POPUP: 4,
    }
  });
