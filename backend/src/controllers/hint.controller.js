const HintService = require("../service/hint.service");
const { validateHintData, validateId } = require("../utils/hint.helper");
const { ErrorHandler } = require("../utils/banner.helper");
const db = require("../models");
const Hint = db.Hint;

class HintController {
  async addHint(req, res) {
    const validationErrors = validateHintData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    return await ErrorHandler.handleAsync(
      res,
      async () => {
        const hint = await HintService.createHint({
          ...req.body,
          createdBy: req.user.id,
        });
        return res.status(201).json({
          success: true,
          data: hint,
        });
      },
      "CREATE_HINT_ERROR",
      "An unexpected error occurred while creating the hint"
    );
  }

  async getHints(req, res) {
    return await ErrorHandler.handleAsync(
      res,
      async () => {
        const hints = await HintService.getHints(req.user.id);
        return res.status(201).json({
          success: true,
          data: hints,
        });
      },
      "GET_HINTS_ERROR",
      "An unexpected error occurred while retrieving hints"
    );
  }

  async getAllHints(req, res) {
    return await ErrorHandler.handleAsync(
      res,
      async () => {
        const hints = await HintService.getAllHints();
        return res.status(201).json({
          success: true,
          data: hints,
        });
      },
      "GET_ALL_HINTS_ERROR",
      "An unexpected error occurred while retrieving hints"
    );
  }

  async getHintById(req, res) {
    const { hintId } = req.params;
    validateId(hintId);
    return await ErrorHandler.handleAsync(
      res,
      async () => {
        const hint = await HintService.getHintById(hintId);
        if (!hint) {
          return res.status(404).json({
            errors: [{ msg: "Hint not found" }],
          });
        }
        return res.status(200).json({
          success: true,
          data: hint,
        });
      },
      "GET_HINT_BY_ID_ERROR",
      "An unexpected error occurred while retrieving the hint"
    );
  }

  async updateHint(req, res) {
    const { hintId } = req.params;
    const validationErrors = validateHintData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    return await ErrorHandler.handleAsync(
      res,
      async () => {
        const hint = await HintService.getHintById(hintId);

        if (!hint) {
          return res.status(404).json({
            errors: [{ msg: "Hint not found" }],
          });
        }
        const updatedHint = await HintService.updateHint(hintId, req.body);
        return res.status(200).json({
          success: true,
          data: updatedHint,
        });
      },
      "UPDATE_HINT_ERROR",
      "An unexpected error occurred while updating the hint"
    );
  }

  async deleteHint(req, res) {
    const { hintId } = req.params;
    validateId(hintId);
    return await ErrorHandler.handleAsync(
      res,
      async () => {
        const deleted = await HintService.deleteHint(hintId);

        if (!deleted) {
          return res.status(404).json({
            errors: [{ msg: "Hint not found" }],
          });
        }
        return res.status(200).json({
          success: true,
          message: `Hint with ID ${hintId} deleted successfully`,
        });
      },
      "DELETE_HINT_ERROR",
      "An unexpected error occurred while deleting the hint"
    );
  }
}

module.exports = new HintController();
