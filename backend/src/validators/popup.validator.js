const { checkSchema, param, Schema } = require('express-validator');

const isHexColor = (value) => /^#[0-9A-F]{6}$/i.test(value);

const popUpSchema = {
    closeButtonAction: {
        exists: { errorMessage: 'closeButtonAction is required' },
        isString: { errorMessage: 'closeButtonAction must be a string' },
        isIn: {
            options: [['no-action', 'open-url', 'close-popup', 'open-url-new-tab']],
            errorMessage: 'Invalid closeButtonAction',
        },
    },
    popupSize: {
        exists: { errorMessage: 'popupSize is required' },
        isString: { errorMessage: 'popupSize must be a string' },
        isIn: {
            options: [['small', 'medium', 'large']],
            errorMessage: 'Invalid popupSize',
        },
    },
    url: {
        optional: true,
        isString: { errorMessage: 'url must be a string' },
    },
    actionButtonText: {
        optional: true,
        isString: { errorMessage: 'actionButtonText must be a string' },
    },
    headerBackgroundColor: {
        exists: { errorMessage: 'headerBackgroundColor is required' },
        isString: { errorMessage: 'headerBackgroundColor must be a string' },
        custom: {
            options: isHexColor,
            errorMessage: 'Invalid headerBackgroundColor',
        },
    },
    headerColor: {
        exists: { errorMessage: 'headerColor is required' },
        isString: { errorMessage: 'headerColor must be a string' },
        custom: {
            options: isHexColor,
            errorMessage: 'Invalid headerColor',
        },
    },
    textColor: {
        exists: { errorMessage: 'textColor is required' },
        isString: { errorMessage: 'textColor must be a string' },
        custom: {
            options: isHexColor,
            errorMessage: 'Invalid textColor',
        },
    },
    buttonBackgroundColor: {
        exists: { errorMessage: 'buttonBackgroundColor is required' },
        isString: { errorMessage: 'buttonBackgroundColor must be a string' },
        custom: {
            options: isHexColor,
            errorMessage: 'Invalid buttonBackgroundColor',
        },
    },
    buttonTextColor: {
        exists: { errorMessage: 'buttonTextColor is required' },
        isString: { errorMessage: 'buttonTextColor must be a string' },
        custom: {
            options: isHexColor,
            errorMessage: 'Invalid buttonTextColor',
        },
    },
};
module.exports = popUpSchema;
// module.exports = {
//     validate(method) {
//         switch (method) {
//             case 'addPopup':
//                 return checkSchema(baseValidation);
//             case 'editPopup':
//                 return [
//                     param('id')
//                         .exists().withMessage('id is required')
//                         .isInt().withMessage('id must be an integer'),
//                     checkSchema(Object.keys(baseValidation).reduce((acc, key) => {
//                         acc[key] = { ...baseValidation[key], optional: { options: { nullable: true, checkFalsy: true } } };
//                         return acc;
//                     }, {})),
//                 ];
//             case 'deletePopup':
//                 return [
//                     param('id')
//                         .exists().withMessage('id is required')
//                         .isInt().withMessage('id must be an integer'),
//                 ];
//             default:
//                 return [];
//         }
//     }
// };
