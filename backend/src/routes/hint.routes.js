const express = require("express");
const hintController = require("../controllers/hint.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add_hint", authenticateJWT, hintController.addHint);
router.delete("/delete_hint/:hintId", authenticateJWT, hintController.deleteHint);
router.put("/edit_hint/:hintId", authenticateJWT, hintController.updateHint);
router.get("/all_hints", authenticateJWT, hintController.getAllHints);
router.get("/hints", authenticateJWT, hintController.getHints);
router.get("/get_hint/:hintId", authenticateJWT, hintController.getHintById);

module.exports = router;