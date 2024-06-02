
const express = require('express');
const popupController = require('../controllers/popupController');

const router = express.Router();

router.post('/add_popup', popupController.addPopup);
router.delete('/delete_popup/:id', popupController.deletePopup);
router.put('/edit_popup/:id', popupController.editPopup);
router.get('/all_popups/', popupController.getAllPopups);

module.exports = router;
