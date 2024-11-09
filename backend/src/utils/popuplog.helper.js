const {body} = require('express-validator')

const VALID_POPUP_TYPES = ['guide', 'tooltip', 'hotspot', 'checklist'];

const addPopupLogValidation = [
    body('popupType')
        .notEmpty().withMessage('popupType is required')
        .trim()
        .toLowerCase()
        .isIn(VALID_POPUP_TYPES).withMessage('Invalid popupType'),
    body('userId')
        .notEmpty().withMessage('userId is required')
        .isString()
        .trim()
        .escape()
        .withMessage('userId must be a non-empty string'),
    body('completed')
        .notEmpty()
        .isBoolean()
        .toBoolean()
        .withMessage('completed must be a boolean value')
]

module.exports = {
    addPopupLogValidation
}