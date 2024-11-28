const { describe, it, beforeEach, afterEach } = require("mocha");
const sinon = require("sinon");
const mocks = require("../../mocks/popupLog.mock.js");
const { expect } = require("chai");
const popuplogService = require("../../../service/popuplog.service.js");
const popuplogController = require("../../../controllers/popuplog.controller.js");

const popupLog = mocks.PopupLogBuilder.popupLog;
const popupLogList = mocks.popupLogList;

describe("Test popup log controller", () => {
  const serviceMock = {};
  const req = {};
  const res = {};
  describe("addPopupLog", () => {
    beforeEach(() => {
      req.user = { id: "123" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return a new popup log", async () => {
      const popupLogData = popupLog().build();
      req.body = popupLogData;
      serviceMock.addPopupLog = sinon
        .stub(popuplogService, "addPopupLog")
        .returns(popupLogData);
      await popuplogController.addPopupLog(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(popupLogData);
    });
    it("should create a new popup log with default completed value", async () => {
      req.body = popupLog().missingCompleted().build();
      serviceMock.addPopupLog = sinon
        .stub(popuplogService, "addPopupLog")
        .returns(popupLog().build());
      await popuplogController.addPopupLog(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(popupLog().build());
    });
    it("should return 500 if an error occurs", async () => {
      req.body = popupLog().build();
      serviceMock.addPopupLog = sinon
        .stub(popuplogService, "addPopupLog")
        .throws(new Error("Error adding popup log"));
      await popuplogController.addPopupLog(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({
        message: "Error logging popup event",
        error: new Error("Error adding popup log"),
      });
    });
  });
  describe("getAllPopups", () => {
    beforeEach(() => {
      req.user = { id: "123" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return all popup logs", async () => {
      serviceMock.getAllPopupLogs = sinon
        .stub(popuplogService, "getAllPopupLogs")
        .returns(popupLogList);
      await popuplogController.getAllPopups(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(popupLogList);
    });
    it("should return 500 if an error occurs", async () => {
      serviceMock.getAllPopupLogs = sinon
        .stub(popuplogService, "getAllPopupLogs")
        .throws(new Error("Error getting all popup logs"));
      await popuplogController.getAllPopups(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_ALL_POPUP_LOGS_ERROR",
        message: "Error getting all popup logs",
      });
    });
  });
});
