// API constants
//local environment
export const API_BASE_URL = 'http://localhost:3000/api/';

//staging environment
// export const API_BASE_URL = 'https://onboarding-demo.bluewavelabs.ca/api/';
// Other constants
export const APP_TITLE = 'Bluewave Onboarding';
export const SUPPORT_EMAIL = 'support@bluewave.com';

export const ACTIONS_TYPES = Object.freeze({
    NO_ACTION: 1,
    OPEN_URL: 2,
    OPEN_URL_IN_NEW_TAB: 3,
    CLOSE_POPUP: 4,
});
export const ACTIONS_Names = Object.freeze({
    NO_ACTION: 'No action',
    OPEN_URL: 'Open URL',
    OPEN_URL_IN_NEW_TAB: 'Open URL in a new tab',
    CLOSE_POPUP: 'close the popup',
});

export const ACTIONS_Options = Object.values(ACTIONS_Names);
