const HintService = require("../service/hint.service");
const { internalServerError } = require("../utils/errors");
const { isValidHexColor } = require("../utils/guideHelpers");
const db = require("../models");
const Hint = db.Hint;

const validateAction = (value) => {
  const validActions = ["no action", "open url", "open url in a new tab"];
  return validActions.includes(value);
};

class HintController {
  async addHint(req, res) {
    const userId = req.user.id;
    const {
      action,
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    } = req.body;

    if (!action) {
      return res.status(400).json({
        errors: [{ msg: "action is required" }],
      });
    }

    if (!validateAction(action)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid value for action" }],
      });
    }

    const colorFields = {
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    };
    for (const [field, value] of Object.entries(colorFields)) {
      if (value && !isValidHexColor(value)) {
        return res.status(400).json({
          errors: [{ msg: `Invalid value for ${field}` }],
        });
      }
    }

    try {
      const hint = await HintService.createHint({
        ...req.body,
        createdBy: userId,
      });

      return res.status(201).json(hint);
    } catch (error) {
      const { statusCode, payload } = internalServerError(
        "CREATE_HINT_ERROR",
        error.message
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
      const { statusCode, payload } = internalServerError(
        "GET_HINTS_ERROR",
        error.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllHints(req, res) {
    try {
      const hints = await HintService.getAllHints();
      return res.status(200).json(hints);
    } catch (error) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_HINTS_ERROR",
        error.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getHintById(req, res) {
    const { hintId } = req.params;

    if (isNaN(hintId) || hintId.trim() === "") {
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
      const { statusCode, payload } = internalServerError(
        "GET_HINT_BY_ID_ERROR",
        error.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async updateHint(req, res) {
    const { hintId } = req.params;
    const {
      action,
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    } = req.body;

    if (!action) {
      return res.status(400).json({
        errors: [{ msg: "action is required" }],
      });
    }

    if (!validateAction(action)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid value for action" }],
      });
    }

    const colorFields = {
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    };
    for (const [field, value] of Object.entries(colorFields)) {
      if (value && !isValidHexColor(value)) {
        return res.status(400).json({
          errors: [{ msg: `Invalid value for ${field}` }],
        });
      }
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
      const { statusCode, payload } = internalServerError(
        "UPDATE_HINT_ERROR",
        error.message
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
      const { statusCode, payload } = internalServerError(
        "DELETE_HINT_ERROR",
        error.message
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new HintController();
