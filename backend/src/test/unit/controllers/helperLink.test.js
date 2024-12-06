(async () => {
  const { describe, it, beforeEach, afterEach } = await import("mocha");
  const sinon = await import("sinon");
  const { expect } = await import("chai");
  const mocks = require("../../mocks/helperLink.mock.js");
  const helperLinks = require("../../../controllers/helperLink.controller.js");
  const service = require("../../../service/helperLink.service.js");

  const controller = helperLinks.controller;

  describe("Test helper link controller", () => {
    const serviceMock = {};
    const req = {};
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    describe("addHelper", () => {
      it("should return 400 if title is missing", async () => {
        req.user = {
          id: 1,
        };
        req.body = mocks.HelperLinkBuilder.helperLink().missingTitle().build();
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "header is required" }],
        });
      });
      it("should return 400 if headerBackgroundColor is invalid", async () => {
        req.user = {
          id: 1,
        };
        req.body = mocks.HelperLinkBuilder.helperLink()
          .invalidHeaderBackgroundColor()
          .build();
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [
            {
              msg: "headerBackgroundColor must be a valid hex color code",
            },
          ],
        });
      });
      it("should return 400 if linkFontColor is invalid", async () => {
        req.user = {
          id: 1,
        };
        req.body = mocks.HelperLinkBuilder.helperLink()
          .invalidLinkFontColor()
          .build();
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [
            {
              msg: "linkFontColor must be a valid hex color code",
            },
          ],
        });
      });
      it("should return 400 if iconColor is invalid", async () => {
        req.user = {
          id: 1,
        };
        req.body = mocks.HelperLinkBuilder.helperLink()
          .invalidIconColor()
          .build();
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [
            {
              msg: "iconColor must be a valid hex color code",
            },
          ],
        });
      });
      it("should skip colors validation if colors are not provided", async () => {
        const validateColors = sinon.spy(helperLinks, "validateColors");
        req.user = {
          id: 1,
        };
        serviceMock.createHelper = sinon
          .stub(service, "createHelper")
          .resolves({});
        const { iconColor, headerBackgroundColor, linkFontColor, ...helper } =
          mocks.HelperLinkBuilder.helperLink().build();
        req.body = helper;
        await controller.addHelper(req, res);
        expect(res.status.called).to.be.true;
        expect(res.json.called).to.be.true;
        expect(validateColors.called).to.be.false;
      });
      it("should skip links validation if links are not provided", async () => {
        const validateLinks = sinon.spy(helperLinks, "validateLinks");
        req.params = {
          id: "1",
        };
        serviceMock.createHelper = sinon
          .stub(service, "createHelper")
          .resolves({});
        const { links, ...helper } =
          mocks.HelperLinkBuilder.helperLink().build();
        req.body = helper;
        await controller.addHelper(req, res);
        expect(res.status.called).to.be.true;
        expect(res.json.called).to.be.true;
        expect(validateLinks.called).to.be.false;
      });
      it("should return 400 if link is missing title", async () => {
        req.user = {
          id: 1,
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().missingTitle().build()],
        };
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "title and url are required" }],
        });
      });
      it("should return 400 if link is missing url", async () => {
        req.user = {
          id: 1,
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().missingUrl().build()],
        };
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "title and url are required" }],
        });
      });
      it("should return 400 if link has invalid url", async () => {
        req.user = {
          id: 1,
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().invalidUrl().build()],
        };
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid value for url" }],
        });
      });
      it("should return 400 if link has invalid order value", async () => {
        req.user = {
          id: 1,
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().invalidOrderValue().build()],
        };
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid value for order" }],
        });
      });
      it("should return 400 if link has invalid order type", async () => {
        req.user = {
          id: 1,
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().invalidOrderType().build()],
        };
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid value for order" }],
        });
      });
      it("should return 500 if service throws error", async () => {
        req.user = {
          id: 1,
        };
        req.body = mocks.HelperLinkBuilder.helperLink().build();
        serviceMock.addHelper = sinon
          .stub(service, "createHelper")
          .rejects(new Error("Error creating helper"));
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(500);
        expect(body).to.be.deep.equal({
          error: "Internal Server Error",
          errorCode: "CREATE_HELPER_ERROR",
          message: "Error creating helper",
        });
      });
      it("should return 201 if all data is valid", async () => {
        req.user = {
          id: 1,
        };
        req.body = mocks.HelperLinkBuilder.helperLink().build();
        serviceMock.createHelper = sinon
          .stub(service, "createHelper")
          .resolves(req.body);
        await controller.addHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(201);
        expect(body).to.be.deep.equal(req.body);
      });
    });
    describe("deleteHelper", () => {
      it("should return 400 if id is missing", async () => {
        req.params = {};
        await controller.deleteHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid id" }],
        });
      });
      it("should return 400 if id is invalid", async () => {
        req.params = {
          id: "id",
        };
        await controller.deleteHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid id" }],
        });
      });
      it("should return 500 if service throws error", async () => {
        req.params = {
          id: "1",
        };
        serviceMock.deleteHelper = sinon
          .stub(service, "deleteHelper")
          .rejects();
        await controller.deleteHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(500);
        expect(body).to.be.deep.equal({
          error: "Internal Server Error",
          errorCode: "DELETE_HELPER_ERROR",
          message: "Error",
        });
      });
      it("should return 404 if helper does not exist", async () => {
        req.params = {
          id: "1",
        };
        serviceMock.deleteHelper = sinon
          .stub(service, "deleteHelper")
          .resolves(false);
        await controller.deleteHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(404);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Helper with the specified id does not exist" }],
        });
      });
      it("should return 200 if helper is deleted", async () => {
        req.params = {
          id: "1",
        };
        serviceMock.deleteHelper = sinon
          .stub(service, "deleteHelper")
          .resolves(true);
        await controller.deleteHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(200);
        expect(body).to.be.deep.equal({
          message: "Helper with ID 1 deleted successfully",
        });
      });
    });
    describe("editHelper", () => {
      it("should return 400 if id is missing", async () => {
        req.params = {};
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid id" }],
        });
      });
      it("should return 400 if id is invalid", async () => {
        req.params = {
          id: "id",
        };
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid id" }],
        });
      });
      it("should return 400 if title is missing", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink().missingTitle().build();
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "header is required" }],
        });
      });
      it("should return 400 if headerBackgroundColor is invalid", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink()
          .invalidHeaderBackgroundColor()
          .build();
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [
            {
              msg: "headerBackgroundColor must be a valid hex color code",
            },
          ],
        });
      });
      it("should return 400 if linkFontColor is invalid", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink()
          .invalidLinkFontColor()
          .build();
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [
            {
              msg: "linkFontColor must be a valid hex color code",
            },
          ],
        });
      });
      it("should return 400 if iconColor is invalid", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink()
          .invalidIconColor()
          .build();
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [
            {
              msg: "iconColor must be a valid hex color code",
            },
          ],
        });
      });
      it("should skip colors validation if colors are not provided", async () => {
        const validateColors = sinon.spy(helperLinks, "validateColors");
        req.user = {
          id: 1,
        };
        serviceMock.updateHelper = sinon
          .stub(service, "updateHelper")
          .resolves({});
        const { iconColor, headerBackgroundColor, linkFontColor, ...helper } =
          mocks.HelperLinkBuilder.helperLink().build();
        req.body = helper;
        await controller.editHelper(req, res);
        expect(res.status.called).to.be.true;
        expect(res.json.called).to.be.true;
        expect(validateColors.called).to.be.false;
      });
      it("should skip links validation if links are not provided", async () => {
        const validateLinks = sinon.spy(helperLinks, "validateLinks");
        req.params = {
          id: "1",
        };
        serviceMock.editHelper = sinon
          .stub(service, "updateHelper")
          .resolves({});
        const { links, ...helper } =
          mocks.HelperLinkBuilder.helperLink().build();
        req.body = helper;
        await controller.editHelper(req, res);
        expect(res.status.called).to.be.true;
        expect(res.json.called).to.be.true;
        expect(validateLinks.called).to.be.false;
      });
      it("should return 400 if link is missing title", async () => {
        req.params = {
          id: "1",
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().missingTitle().build()],
        };
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "title and url are required" }],
        });
      });
      it("should return 400 if link is missing url", async () => {
        req.params = {
          id: "1",
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().missingUrl().build()],
        };
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "title and url are required" }],
        });
      });
      it("should return 400 if link has invalid url", async () => {
        req.params = {
          id: "1",
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().invalidUrl().build()],
        };
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid value for url" }],
        });
      });
      it("should return 400 if link has invalid order value", async () => {
        req.params = {
          id: "1",
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().invalidOrderValue().build()],
        };
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid value for order" }],
        });
      });
      it("should return 400 if link has invalid order type", async () => {
        req.params = {
          id: "1",
        };
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.body = {
          ...helper,
          links: [mocks.LinkBuilder.link().invalidOrderType().build()],
        };
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid value for order" }],
        });
      });
      it("should return 500 if service throws error", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink().build();
        serviceMock.editHelper = sinon
          .stub(service, "updateHelper")
          .rejects(new Error("Error updating helper"));
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(500);
        expect(body).to.be.deep.equal({
          error: "Internal Server Error",
          errorCode: "EDIT_HELPER_ERROR",
          message: "Error updating helper",
        });
      });
      it("should return 404 if helper does not exist", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink().build();
        serviceMock.editHelper = sinon
          .stub(service, "updateHelper")
          .resolves(null);
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(404);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Helper with the specified id does not exist" }],
        });
      });
      it("should return 200 if helper is updated", async () => {
        req.params = {
          id: "1",
        };
        req.body = mocks.HelperLinkBuilder.helperLink().build();
        serviceMock.editHelper = sinon
          .stub(service, "updateHelper")
          .resolves(req.body);
        await controller.editHelper(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(200);
        expect(body).to.be.deep.equal(req.body);
      });
    });
    describe("getAllHelpers", () => {
      it("should return 500 if service throws error", async () => {
        serviceMock.getAllHelpers = sinon
          .stub(service, "getAllHelpers")
          .rejects();
        await controller.getAllHelpers(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(500);
        expect(body).to.be.deep.equal({
          error: "Internal Server Error",
          errorCode: "GET_ALL_HELPERS_ERROR",
          message: "Error",
        });
      });
      it("should return 200 if helpers are found", async () => {
        const helpers = mocks.HelperLinkList;
        serviceMock.getAllHelpers = sinon
          .stub(service, "getAllHelpers")
          .resolves(helpers);
        await controller.getAllHelpers(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(200);
        expect(body).to.be.deep.equal(helpers);
      });
    });
    describe("getHelpersByUserId", () => {
      req.user = { id: 1 };
      it("should return 500 if service throws error", async () => {
        serviceMock.getHelpersByUserId = sinon
          .stub(service, "getHelpersByUserId")
          .rejects(new Error("Error retrieving helper by ID"));
        await controller.getHelpersByUserId(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(500);
        expect(body).to.be.deep.equal({
          error: "Internal Server Error",
          errorCode: "GET_HELPERS_ERROR",
          message: "Error retrieving helper by ID",
        });
      });
      it("should return 200 if helpers are found", async () => {
        const helpers = mocks.HelperLinkList.filter((h) => h.createdBy === 1);
        serviceMock.getHelpersByUserId = sinon
          .stub(service, "getHelpersByUserId")
          .resolves(helpers);
        await controller.getHelpersByUserId(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(200);
        expect(body).to.be.deep.equal(helpers);
      });
    });
    describe("getHelperById", () => {
      it("should return 400 if id is invalid", async () => {
        req.params = {
          id: "id",
        };
        await controller.getHelperById(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid helper ID" }],
        });
      });
      it("should return 400 if id is missing", async () => {
        req.params = {};
        await controller.getHelperById(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Invalid helper ID" }],
        });
      });
      it("should return 404 if helper does not exist", async () => {
        req.params = {
          id: "1",
        };
        serviceMock.getHelperById = sinon
          .stub(service, "getHelperById")
          .resolves(null);
        await controller.getHelperById(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(404);
        expect(body).to.be.deep.equal({
          errors: [{ msg: "Helper not found" }],
        });
      });
      it("should return 500 if service throws error", async () => {
        req.params = {
          id: "1",
        };
        serviceMock.getHelperById = sinon
          .stub(service, "getHelperById")
          .rejects(new Error("Error retrieving helper by ID"));
        await controller.getHelperById(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(500);
        expect(body).to.be.deep.equal({
          error: "Internal Server Error",
          errorCode: "GET_HELPER_BY_ID_ERROR",
          message: "Error retrieving helper by ID",
        });
      });
      it("should return 200 if helper is found", async () => {
        const helper = mocks.HelperLinkBuilder.helperLink().build();
        req.params = {
          id: "1",
        };
        serviceMock.getHelperById = sinon
          .stub(service, "getHelperById")
          .resolves(helper);
        await controller.getHelperById(req, res);
        const status = res.status.args[0][0];
        const body = res.json.args[0][0];
        expect(status).to.equal(200);
        expect(body).to.be.deep.equal(helper);
      });
    });
  });
})();
