const { body } = require('express-validator')

const GuideType = {
    POPUP: 0,
    HINT: 1,
    BANNER: 2,
    LINK: 3,
    TOUR: 4,
    CHECKLIST: 5
}
const VALID_POPUP_TYPES = Object.values(GuideType);
const addPopupLogValidation = [
    body('popupType').notEmpty().withMessage('popupType is required').isIn(VALID_POPUP_TYPES).withMessage('Invalid popupType'),
    body('userId').notEmpty().withMessage('userId is required').isString().trim().withMessage('userId must be a non-empty string'),
    body('completed').notEmpty().isBoolean().withMessage('completed must be a boolean value')
]

module.exports = {
    addPopupLogValidation,
    GuideType
}