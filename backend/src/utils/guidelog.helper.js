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
const addGuideLogValidation = [
    body('guideType').notEmpty().withMessage('guideType is required').isIn(VALID_POPUP_TYPES).withMessage('Invalid guideType'),
    body('userId').notEmpty().withMessage('userId is required').isString().trim().withMessage('userId must be a non-empty string'),
    body('completed').notEmpty().isBoolean().withMessage('completed must be a boolean value'),
    body('guideId').notEmpty().withMessage('guideId is required').isNumeric().trim().withMessage('guideId must be a non-empty integer'),
]

const getLogByUserValidation = [
    body('userId').notEmpty().withMessage('userId is required').isString().trim().withMessage('userId must be a non-empty string')
]

module.exports = {
    addGuideLogValidation,
    getLogByUserValidation,
    GuideType
}