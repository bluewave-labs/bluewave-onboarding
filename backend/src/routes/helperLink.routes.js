const express = require("express");
const helper = require("../controllers/helperLink.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const helperController = helper.controller;

const router = express.Router();

router.use(authenticateJWT);

router.route("/add_helper").post(helperController.addHelper);
router.route("/get_helpers").get(helperController.getHelpersByUserId);
router.route("/all_helpers").get(helperController.getAllHelpers);
router.route("/get_helper/:id").get(helperController.getHelperById);
router.route("/edit_helper/:id").put(helperController.editHelper);
router.route("/delete_helper/:id").delete(helperController.deleteHelper);

module.exports = router;
