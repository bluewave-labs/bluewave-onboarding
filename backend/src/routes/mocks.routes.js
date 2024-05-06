const express = require('express');
const {popup} = require('./../controllers/popup.controller');

const router = express.Router();
router.get('/popup', popup);

module.exports = router;