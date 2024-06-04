// controllers/popupController.js
const popupService = require('../service/popup.service');
const { badRequest, internalServerError } = require('../errors');
const Popup = require('../models/Popup');


class PopupController {

    async addPopup(req, res) {
        // Check if required fields are present and not null
        if (!req.body.popupSize || !req.body.closeButtonAction) {
            return res.status(400).json({ errors: [{ msg: 'popupSize and closeButtonAction are required' }] });
        }
    
        // Get the column type definition from the model
        const popupSizeColumn = Popup.tableAttributes.popupSize;
    
        // Check if the provided value matches the column type definition
        if (!popupSizeColumn.validate.isIn[0].includes(req.body.popupSize)) {
            return res.status(400).json({ errors: [{ msg: 'Invalid value for popupSize' }] });
        }
    
        // Get the column type definition from the model
        const closeButtonActionColumn = Popup.tableAttributes.closeButtonAction;
    
        // Check if the provided value matches the column type definition
        if (!closeButtonActionColumn.validate.isIn[0].includes(req.body.closeButtonAction)) {
            return res.status(400).json({ errors: [{ msg: 'Invalid value for closeButtonAction' }] });
        }
    
        // Validate colors using regex
        const colorFields = ['headerBackgroundColor', 'headerColor', 'textColor', 'buttonBackgroundColor', 'buttonTextColor'];
        const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        for (const field of colorFields) {
            if (req.body[field] && !colorRegex.test(req.body[field])) {
                return res.status(400).json({ errors: [{ msg: `${field} must be a valid hex color code` }] });
            }
        }
        try {
            const newPopup = await popupService.createPopup(req.body);
            res.status(201).json(newPopup);
        } catch (err) {
            console.log(err);
            const { statusCode, payload } = internalServerError('CREATE_POPUP_ERROR', err.message);
            res.status(statusCode).json(payload);
        }
    }
    



    async deletePopup(req, res) {
        try {
            const { id } = req.params;
    
            // Check if id is empty or not a number
            if (isNaN(id) || id.trim() === '') {
                return res.status(400).json({ errors: [{ msg: 'Invalid id' }] });
            }
    
            const deletionResult = await popupService.deletePopup(id);

            // If deletion was unsuccessful, return a bad request response
            if (!deletionResult) {
                return res.status(400).json({ errors: [{ msg: 'Popup with the specified id does not exist' }] });
            }

            res.status(200).json({ message: `Popup with ID ${id} deleted successfully` });
        } catch (err) {
            const { statusCode, payload } = internalServerError('DELETE_POPUP_ERROR', err.message);
            res.status(statusCode).json(payload);
        }
    }
    


    async editPopup(req, res) {
        try {
            const { id } = req.params;
    
            // Check if required fields are present and not null
            if (!req.body.popupSize || !req.body.closeButtonAction) {
                return res.status(400).json({ errors: [{ msg: 'popupSize and closeButtonAction are required' }] });
            }
    
            // Get the column type definition from the model for popupSize
            const popupSizeColumn = Popup.tableAttributes.popupSize;
    
            // Check if the provided value matches the column type definition for popupSize
            if (!popupSizeColumn.validate.isIn[0].includes(req.body.popupSize)) {
                return res.status(400).json({ errors: [{ msg: 'Invalid value for popupSize' }] });
            }
    
            // Get the column type definition from the model for closeButtonAction
            const closeButtonActionColumn = Popup.tableAttributes.closeButtonAction;
    
            // Check if the provided value matches the column type definition for closeButtonAction
            if (!closeButtonActionColumn.validate.isIn[0].includes(req.body.closeButtonAction)) {
                return res.status(400).json({ errors: [{ msg: 'Invalid value for closeButtonAction' }] });
            }
    
            // Validate colors using regex
            const colorFields = ['headerBackgroundColor', 'headerColor', 'textColor', 'buttonBackgroundColor', 'buttonTextColor'];
            const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            for (const field of colorFields) {
                if (req.body[field] && !colorRegex.test(req.body[field])) {
                    return res.status(400).json({ errors: [{ msg: `${field} must be a valid hex color code` }] });
                }
            }
    
            const updatedPopup = await popupService.updatePopup(id, req.body);
            res.status(200).json(updatedPopup);
        } catch (err) {
            const { statusCode, payload } = internalServerError('EDIT_POPUP_ERROR', err.message);
            res.status(statusCode).json(payload);
        }
    }
    



  async getAllPopups(req, res) {
    try {
        const popups = await popupService.getAllPopups();
        res.status(200).json(popups);
    } catch (err) {
        const { statusCode, payload } = internalServerError('GET_ALL_POPUPS_ERROR', err.message);
        res.status(statusCode).json(payload);
    }
}
}

module.exports = new PopupController();
