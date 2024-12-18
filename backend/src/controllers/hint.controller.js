const HintService = require("../service/hint.service");
const { internalServerError } = require("../utils/errors.helper");
const validateHintData = require("../utils/hint.helper");

class HintController {
  async addHint(req, res) {
    const userId = req.user.id;

    const validationErrors = validateHintData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      const hint = await HintService.createHint({
        ...req.body,
        createdBy: userId,
      });

      return res.status(201).json(hint);
    } catch (error) {
      console.error(`CREATE_HINT_ERROR: ${error.message}`);
      const { statusCode, payload } = internalServerError(
        "CREATE_HINT_ERROR",
        "An unexpected error occurred while creating the hint"
      );
      res.status(statusCode).json(payload);
    }
  }

  async getHints(req, res) {
    const userId = req.user.id;

    try {
      const hints = await HintService.getHints(userId);
      return res.status(200).json(hints);
    } catch (error) {
      console.error(`GET_HINTS_ERROR: ${error.message}`);
      const { statusCode, payload } = internalServerError(
        "GET_HINTS_ERROR",
        "An unexpected error occurred while retrieving hints"
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllHints(req, res) {
    try {
      const hints = await HintService.getAllHints();
      return res.status(200).json(hints);
    } catch (error) {
      console.error(`GET_ALL_HINTS_ERROR: ${error.message}`);
      const { statusCode, payload } = internalServerError(
        "GET_ALL_HINTS_ERROR",
        "An unexpected error occurred while retrieving hints"
      );
      res.status(statusCode).json(payload);
    }
  }

  async getHintById(req, res) {
    const { hintId } = req.params;

    if (Number.isNaN(Number(hintId)) || hintId.trim() === "") {
      return res.status(400).json({ errors: [{ msg: "Invalid hint ID" }] });
    }

    try {
      const hint = await HintService.getHintById(hintId);

      if (!hint) {
        return res.status(404).json({
          errors: [{ msg: "Hint not found" }],
        });
      }

      return res.status(200).json(hint);
    } catch (error) {
      console.error(`GET_HINT_BY_ID_ERROR: ${error.message}`);
      const { statusCode, payload } = internalServerError(
        "GET_HINT_BY_ID_ERROR",
        "An unexpected error occurred while retrieving the hint"
      );
      res.status(statusCode).json(payload);
    }
  }

  async updateHint(req, res) {
    const { hintId } = req.params;

    const validationErrors = validateHintData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      const hint = await HintService.getHintById(hintId);

      if (!hint) {
        return res.status(404).json({
          errors: [{ msg: "Hint not found" }],
        });
      }

      const updatedHint = await HintService.updateHint(hintId, req.body);

      return res.status(200).json(updatedHint);
    } catch (error) {
      console.error(`UPDATE_HINT_ERROR: ${error.message}`);
      const { statusCode, payload } = internalServerError(
        "UPDATE_HINT_ERROR",
        "An unexpected error occurred while updating the hint"
      );
      res.status(statusCode).json(payload);
    }
  }

  async deleteHint(req, res) {
    const { hintId } = req.params;

    if (isNaN(hintId) || hintId.trim() === "") {
      return res.status(400).json({ errors: [{ msg: "Invalid hint ID" }] });
    }

    try {
      const deleted = await HintService.deleteHint(hintId);

      if (!deleted) {
        return res.status(404).json({
          errors: [{ msg: "Hint not found" }],
        });
      }

      return res.status(200).json({
        message: `Hint with ID ${hintId} deleted successfully`,
      });
    } catch (error) {
      console.error(`DELETE_HINT_ERROR: ${error.message}`);
      const { statusCode, payload } = internalServerError(
        "DELETE_HINT_ERROR",
        "An unexpected error occurred while deleting the hint"
      );
      res.status(statusCode).json(payload);
    }
  }

  async getHintByUrl(req, res) {
    try {
      const { url } = req.body;

      if (!url || typeof url !== 'string') {
        return res.status(400).json({ errors: [{ msg: "URL is missing or invalid" }] });
      }

      const hint = await HintService.getHintByUrl(url);
      res.status(200).json({ hint });
    } catch (error) {
      internalServerError(
        "GET_HINT_BY_URL_ERROR",
        error.message,
      );
    }
  };
}

module.exports = new HintController();
