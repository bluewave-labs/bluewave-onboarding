const express = require("express");
const linkController = require("../controllers/link.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add_link", authenticateJWT, linkController.addLink);
router.delete("/delete_link/:id", authenticateJWT, linkController.deleteLink);
router.put("/edit_link/:id", authenticateJWT, linkController.editLink);
router.get("/all_links", authenticateJWT, linkController.getAllLinks);
router.get("/links", authenticateJWT, linkController.getLinksByUserId);
router.get("/get_link/:id", authenticateJWT, linkController.getLinksById);

module.exports = router;
