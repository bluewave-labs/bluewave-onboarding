const helperService = require("../service/helperLink.service");
const { internalServerError } = require("../utils/errors.helper");
const { validateHexColor } = require("../utils/guide.helper");
const { validateUrl } = require("../utils/link.helper");

function validateColors(colors) {
  for (const [name, color] of Object.entries(colors)) {
    if (color) {
      validateHexColor(color, name);
    }
  }
}

function validateLinks(links) {
  const result = [];
  for (const link of links) {
    const { title, url, order } = link;
    if (!title || !url) {
      result.push({ msg: "title and url are required" });
      continue;
    }
    if (!validateUrl(url)) {
      result.push({ msg: "Invalid value for url" });
      continue;
    }
    if (order && order < 1) {
      result.push({ msg: "Invalid value for order" });
      continue;
    }
    result.push({ msg: null });
  }
  return result;
}

class LinkController {
  async addHelper(req, res) {
    const userId = req.user.id;
    const { title, headerBackgroundColor, linkFontColor, iconColor, links } =
      req.body;

    if (!title) {
      return res.status(400).json({
        errors: [{ msg: "header is required" }],
      });
    }

    try {
      validateColors({ headerBackgroundColor, linkFontColor, iconColor });
    } catch (e) {
      return res.status(400).json({
        errors: [
          {
            msg: e.message,
          },
        ],
      });
    }

    if (links) {
      const result = validateLinks(links);

      if (result.some((it) => it?.msg !== null)) {
        const response = result.find((it) => it.msg);
        return res.status(400).json({ errors: response });
      }
    }

    try {
      const newHelperData = {
        ...req.body,
        createdBy: userId,
      };
      const newHelper = await helperService.createHelper(newHelperData, links);
      res.status(201).json(newHelper);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "CREATE_HELPER_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async deleteHelper(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const deletionResult = await helperService.deleteHelper(id);

      if (!deletionResult) {
        return res.status(404).json({
          errors: [{ msg: "Helper with the specified id does not exist" }],
        });
      }

      res
        .status(200)
        .json({ message: `Helper with ID ${id} deleted successfully` });
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "DELETE_HELPER_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async editHelper(req, res) {
    try {
      const { id } = req.params;
      const { title, headerBackgroundColor, linkFontColor, iconColor, links } =
        req.body;

      if (!title) {
        return res.status(400).json({
          errors: [{ msg: "header is required" }],
        });
      }

      try {
        validateColors({
          headerBackgroundColor,
          linkFontColor,
          iconColor,
        });
      } catch (e) {
        return res.status(400).json({
          errors: [
            {
              msg: e.message,
            },
          ],
        });
      }

      if (links) {
        const result = validateLinks(links);
        if (result.some((it) => it?.msg !== null)) {
          const response = result.filter((it) => it.msg);
          return res.status(400).json({ errors: response });
        }
      }

      const updatedHelper = await helperService.updateHelper(
        id,
        req.body,
        links
      );
      res.status(200).json(updatedHelper);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "EDIT_HELPER_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllHelpers(_, res) {
    try {
      const links = await helperService.getAllHelpers();
      res.status(200).json(links);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_HELPERS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getHelpersByUserId(req, res) {
    try {
      const userId = req.user.id;
      const helpers = await helperService.getHelpersByUserId(userId);
      res.status(200).json(helpers);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_HELPERS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getHelperById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid helper ID" }] });
      }

      const helper = await helperService.getHelperById(id);

      if (!helper) {
        return res.status(404).json({ errors: [{ msg: "Helper not found" }] });
      }

      res.status(200).json(helper);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_HELPER_BY_ID_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new LinkController();
