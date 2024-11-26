const { describe, it, beforeEach, afterEach } = require("mocha");
const sinon = require("sinon");
const mocks = require("../../mocks/helperLink.mock.js");
const { expect } = require("chai");
const linkService = require("../../../service/link.service.js");
const linkController = require("../../../controllers/link.controller.js");

const link = mocks.LikBuilder.link;

describe("Test link service", () => {
  const serviceMock = {};
  const req = {};
  const res = {};
  describe("addLink", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 400 if url is missing", async () => {
      req.body = link().missingUrl().build();
      await linkController.addLink(req, res);
      const params = res.json.getCall(0).args[0];
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "title and url are required" }],
      });
    });
    it("should return 400 if title is missing", async () => {
      req.body = link().missingTitle().build();
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const params = res.json.getCall(0).args[0];
      expect(params).to.be.deep.equal({
        errors: [{ msg: "title and url are required" }],
      });
    });
    it("should return 400 if title is invalid", async () => {
      req.body = link().invalidTitle().build();
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for title or url" }],
      });
    });
    it("should return 400 if url is invalid", async () => {
      req.body = link().invalidUrl().build();
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const params = res.json.getCall(0).args[0];
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for title or url" }],
      });
    });
    it("should return 400 if type of order is invalid", async () => {
      req.body = link().invalidOrderType().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const params = res.json.getCall(0).args[0];
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for order" }],
      });
    });
    it("should return 400 if order is invalid", async () => {
      req.body = link().invalidOrderValue().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for order" }],
      });
    });
    it("should return 201 if link was created", async () => {
      req.body = link().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      serviceMock.createLink = sinon
        .stub(linkService, "createLink")
        .resolves(req.body);
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(201);
      expect(params).to.be.deep.equal(req.body);
    });
    it("should return 201 if order is not provided", async () => {
      req.body = link().missingOrder().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      serviceMock.createLink = sinon
        .stub(linkService, "createLink")
        .resolves(req.body);
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(201);
      expect(params).to.be.deep.equal(req.body);
      const paramsCreateLink = serviceMock.createLink.getCall(0).args[0];
      const { id, order, ...expected } = req.body;
      expect(paramsCreateLink).to.be.deep.equal({ ...expected, order: 1 });
    });
    it("should return 201 if target is not provided", async () => {
      req.body = link().missingTarget().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      serviceMock.createLink = sinon
        .stub(linkService, "createLink")
        .resolves(req.body);
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(201);
      expect(params).to.be.deep.equal(req.body);
      const paramsCreateLink = serviceMock.createLink.getCall(0).args[0];
      const { id, target, ...expected } = req.body;
      expect(paramsCreateLink).to.be.deep.equal({ ...expected, target: true });
    });
    it("should return 500 if an error occurs", async () => {
      req.body = link().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .rejects(new Error());
      await linkController.addLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(params).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "CREATE_LINK_ERROR",
      });
    });
  });
  describe("deleteLink", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 400 if id is invalid", async () => {
      req.params = { id: "id" };
      await linkController.deleteLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid id" }],
      });
    });
    it("should return 400 if id is empty", async () => {
      req.params = { id: "" };
      await linkController.deleteLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid id" }],
      });
    });
    it("should return 404 if link was not found", async () => {
      req.params = { id: "1" };
      serviceMock.deleteLink = sinon
        .stub(linkService, "deleteLink")
        .resolves(false);
      await linkController.deleteLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(404);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Link with the specified id does not exist" }],
      });
    });
    it("should return 200 if link was deleted", async () => {
      req.params = { id: "1" };
      serviceMock.deleteLink = sinon
        .stub(linkService, "deleteLink")
        .resolves(true);
      await linkController.deleteLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal({
        message: "Link with ID 1 deleted successfully",
      });
    });
    it("should return 500 if an error occurs", async () => {
      req.params = { id: "1" };
      serviceMock.deleteLink = sinon
        .stub(linkService, "deleteLink")
        .rejects(new Error());
      await linkController.deleteLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(params).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "DELETE_LINK_ERROR",
      });
    });
  });
  describe("editLink", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 400 if id is invalid", async () => {
      req.params = { id: "id" };
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid id" }],
      });
    });
    it("should return 400 if id is empty", async () => {
      req.params = { id: "" };
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid id" }],
      });
    });
    it("should return 400 if title is missing", async () => {
      req.params = { id: "1" };
      req.body = link().missingTitle().build();
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "title and url are required" }],
      });
    });
    it("should return 400 if url is missing", async () => {
      req.params = { id: "1" };
      req.body = link().missingUrl().build();
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "title and url are required" }],
      });
    });
    it("should return 400 if title is invalid", async () => {
      req.params = { id: "1" };
      req.body = link().invalidTitle().build();
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for title or url" }],
      });
    });
    it("should return 400 if url is invalid", async () => {
      req.params = { id: "1" };
      req.body = link().invalidUrl().build();
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for title or url" }],
      });
    });
    it("should return 400 if order is invalid", async () => {
      req.params = { id: "1" };
      req.body = link().invalidOrderValue().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for order" }],
      });
    });
    it("should return 400 if order type is invalid", async () => {
      req.params = { id: "1" };
      req.body = link().invalidOrderType().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid value for order" }],
      });
    });
    it("should return 200 if order is not provided", async () => {
      req.body = link().missingOrder().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      serviceMock.updateLink = sinon
        .stub(linkService, "updateLink")
        .resolves(req.body);
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal(req.body);
      const paramsUpdateLink = serviceMock.updateLink.getCall(0).args[1];
      const { id, order, ...expected } = req.body;
      expect(paramsUpdateLink).to.be.deep.equal({ ...expected, order: 1 });
    });
    it("should return 200 if target is not provided", async () => {
      req.body = link().missingTarget().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      serviceMock.updateLink = sinon
        .stub(linkService, "updateLink")
        .resolves(req.body);
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal(req.body);
      const paramsUpdateLink = serviceMock.updateLink.getCall(0).args[1];
      const { id, target, ...expected } = req.body;
      expect(paramsUpdateLink).to.be.deep.equal({ ...expected, target: true });
    });
    it("should return 200 if link was updated", async () => {
      req.params = { id: "1" };
      req.body = link().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves([]);
      serviceMock.updateLink = sinon
        .stub(linkService, "updateLink")
        .resolves(req.body);
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal(req.body);
    });
    it("should return 500 if an error occurs", async () => {
      req.params = { id: "1" };
      req.body = link().build();
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .rejects(new Error());
      await linkController.editLink(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(params).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "EDIT_LINK_ERROR",
      });
    });
  });
  describe("getAllLinks", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 200 if links were found", async () => {
      serviceMock.getAllLinks = sinon
        .stub(linkService, "getAllLinks")
        .resolves(mocks.LinksList);
      await linkController.getAllLinks(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal(mocks.LinksList);
    });
    it("should return 500 if an error occurs", async () => {
      serviceMock.getAllLinks = sinon
        .stub(linkService, "getAllLinks")
        .rejects(new Error());
      await linkController.getAllLinks(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(params).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_ALL_LINKS_ERROR",
      });
    });
  });
  describe("getLinksByHelperId", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 400 if helperId is invalid", async () => {
      req.query = { helperId: "id" };
      await linkController.getLinksByHelperId(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid helperId" }],
      });
    });
    it("should return 200 if links were found", async () => {
      req.query = { helperId: "1" };
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .resolves(mocks.LinksList);
      await linkController.getLinksByHelperId(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal(mocks.LinksList);
    });
    it("should return 500 if an error occurs", async () => {
      req.query = { helperId: "1" };
      serviceMock.getLinksByHelperId = sinon
        .stub(linkService, "getLinksByHelperId")
        .rejects(new Error());
      await linkController.getLinksByHelperId(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(params).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_LINKS_ERROR",
      });
    });
  });
  describe("getLinksById", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 400 if id is invalid", async () => {
      req.params = { id: "id" };
      await linkController.getLinksById(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid link ID" }],
      });
    });
    it("should return 400 if id is empty", async () => {
      req.params = { id: "" };
      await linkController.getLinksById(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(400);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Invalid link ID" }],
      });
    });
    it("should return 404 if link was not found", async () => {
      req.params = { id: "1" };
      serviceMock.getLinkById = sinon
        .stub(linkService, "getLinkById")
        .resolves(null);
      await linkController.getLinksById(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(404);
      expect(params).to.be.deep.equal({
        errors: [{ msg: "Link not found" }],
      });
    });
    it("should return 200 if link was found", async () => {
      req.params = { id: "1" };
      serviceMock.getLinkById = sinon
        .stub(linkService, "getLinkById")
        .resolves(mocks.LinksList[0]);
      await linkController.getLinksById(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(params).to.be.deep.equal(mocks.LinksList[0]);
    });
    it("should return 500 if an error occurs", async () => {
      req.params = { id: "1" };
      serviceMock.getLinkById = sinon
        .stub(linkService, "getLinkById")
        .rejects(new Error());
      await linkController.getLinksById(req, res);
      const status = res.status.getCall(0).args[0];
      const params = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(params).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_LINK_BY_ID_ERROR",
      });
    });
  });
});
