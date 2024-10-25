const linkService = require("../service/link.service");
const { internalServerError } = require("../utils/errors");
const { isValidHexColor, checkColorFields } = require("../utils/guideHelpers");
const db = require("../models");
const { URL_REGEX } = require("../models/Link");
const Link = db.Link;

const validateUrl = (value) => {
  return URL_REGEX.test(value);
};

class LinkController {
  async addLink(req, res) {
    const userId = req.user.id;
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        errors: [{ msg: "title and url are required" }],
      });
    }

    if (validateUrl(title) || !validateUrl(url)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid value for title or url" }],
      });
    }

    try {
      const newLinkData = { ...req.body, createdBy: userId };
      const newPopup = await linkService.createLink(newLinkData);
      res.status(201).json(newPopup);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "CREATE_LINK_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async deleteLink(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const deletionResult = await linkService.deleteLink(id);

      if (!deletionResult) {
        return res.status(404).json({
          errors: [{ msg: "Link with the specified id does not exist" }],
        });
      }

      res
        .status(200)
        .json({ message: `Link with ID ${id} deleted successfully` });
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "DELETE_LINK_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async editLink(req, res) {
    try {
      const { id } = req.params;
      const { title, url } = req.body;

      if (!title || !url) {
        return res.status(400).json({
          errors: [{ msg: "title and url are required" }],
        });
      }

      if (validateUrl(title) || !validateUrl(url)) {
        return res.status(400).json({
          errors: [{ msg: "Invalid value for title or url" }],
        });
      }

      const updatedLink = await linkService.updateLink(id, req.body);
      res.status(200).json(updatedLink);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "EDIT_LINK_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllLinks(_, res) {
    try {
      const links = await linkService.getAllLinks();
      res.status(200).json(links);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_LINKS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getLinksByUserId(req, res) {
    try {
      const userId = req.user.id;
      const links = await linkService.getLinksByUserId(userId);
      res.status(200).json(links);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_LINKS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getLinksById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid link ID" }] });
      }

      const link = await linkService.getLinkById(id);

      if (!link) {
        return res.status(404).json({ errors: [{ msg: "Link not found" }] });
      }

      res.status(200).json(link);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_LINK_BY_ID_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new LinkController();
