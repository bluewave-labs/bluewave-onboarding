const express = require("express");
const hintController = require("../controllers/hint.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add_hint", authenticateJWT, hintController.addHint);
router.delete("/delete_hint/:id", authenticateJWT, hintController.deleteHint);
router.put("/edit_hint/:id", authenticateJWT, hintController.updateHint);
router.get("/all_hints", authenticateJWT, hintController.getAllHints);
router.get("/hints", authenticateJWT, hintController.getHints);
router.get("/get_hint/:id", authenticateJWT, hintController.getHintById);

module.exports = router;