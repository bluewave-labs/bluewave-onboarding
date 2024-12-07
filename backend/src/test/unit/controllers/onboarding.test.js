const { describe, it, beforeEach, afterEach } = require("mocha");
const sinon = require("sinon");
const { expect } = require("chai");
const onboardingController = require("../../../controllers/onboarding.controller.js");

describe("Test onboarding controller", () => {
  const req = {};
  const res = {};
  describe("popup", () => {
    beforeEach(() => {
      req.user = { id: "123" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 200 and a list with one popup when key is A", async () => {
      req.query = { key: "A" };
      await onboardingController.popup(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.equal(200);
      expect(body).to.deep.equal([
        {
          action: "close",
          actionButtonColor: "#CCCCCC",
          actionButtonText: "Kapat/Close",
          contentHtml: "tek content",
          font: "14px",
          fontColor: "#AAAAAA",
          headerBg: "#4F9EBF",
          headerText: "test header text",
          headerTextColor: "#5F5014",
          no: 1,
        },
      ]);
      expect(body).to.have.length(1);
    });
    it("should return 200 and a list with two popups when key is B", async () => {
      req.query = { key: "B" };
      await onboardingController.popup(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.equal(200);
      expect(body).to.deep.equal([
        {
          action: "close",
          actionButtonColor: "#CCCCCC",
          actionButtonText: "Kapat/Close1",
          contentHtml: "11",
          font: "14px",
          fontColor: "#AAAAAA",
          headerBg: "#A2A2A2",
          headerText: "test header text1",
          no: 1,
        },
        {
          action: "close",
          actionButtonColor: "#CCCCCC",
          actionButtonText: "Kapat/Close2",
          contentHtml: "22",
          font: "14px",
          fontColor: "#AAAAAA",
          headerBg: "#A2A2A2",
          headerText: "test header text2",
          no: 2,
        },
      ]);
      expect(body).to.have.length(2);
    });
    it("should return 200 and an empty list when key is not A or B", async () => {
      req.query = { key: "C" };
      await onboardingController.popup(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.equal(200);
      expect(body).to.deep.equal([]);
    });
  });
  describe("onboard", () => {
    beforeEach(() => {
      req.user = { id: "123" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 200 and an object with the user info", async () => {
      req.body = { userId: "123" };
      await onboardingController.onboard(req, res);
      const status = res.status.getCall(0).args[0];
      const body = res.json.getCall(0).args[0];
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        userId: "123",
        popupData: [
          {
            no: 1,
            headerText: "test header text",
            headerTextColor: "#5F5014",
            headerBg: "#4F9EBF",
            contentHtml: "tek content",
            font: "14px",
            fontColor: "#AAAAAA",
            action: "close",
            actionButtonText: "Kapat/Close",
            actionButtonColor: "#CCCCCC",
          },
        ],
        bannerData: undefined,
        tourData: undefined,
        linkData: undefined,
      });
    });
  });
});
