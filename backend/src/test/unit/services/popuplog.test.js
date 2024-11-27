const { describe, it, afterEach } = require("mocha");
const db = require("../../../models/index.js");
const sinon = require("sinon");
const mocks = require("../../mocks/popupLog.mock.js");
const { expect } = require("chai");
const popuplogService = require("../../../service/popuplog.service.js");

const PopupLog = db.PopupLog;
const popupLog = mocks.PopupLogBuilder.popupLog;

describe("Test popup log service", () => {
  const PopupLogMock = {};
  afterEach(sinon.restore);
  it("addPopupLog - should create a new popup log", async () => {
    const body = popupLog().build();
    PopupLogMock.create = sinon.stub(PopupLog, "create").resolves(body);
    const result = await popuplogService.addPopupLog(body);
    expect(result).to.be.deep.equal(body);
    expect(PopupLogMock.create.called).to.be.true;
    const params = PopupLogMock.create.getCall(0).args[0];
    const { showingTime, ...rest } = params;
    const { showingTime: s, ...expected } = body;
    expect(rest).to.be.deep.equal(expected);
    expect(Date.parse(showingTime)).to.be.closeTo(Date.parse(s), 1000);
  });
  it("getAllPopupLogs - should return all popup logs", async () => {
    PopupLogMock.findAll = sinon
      .stub(PopupLog, "findAll")
      .resolves(mocks.popupLogList);
    const popupLogs = await popuplogService.getAllPopupLogs();
    popupLogs.forEach((log, index) => {
      const { showingTime, ...rest } = log;
      const { showingTime: s, ...expected } = mocks.popupLogList[index];
      expect(rest).to.be.deep.equal(expected);
    });
  });
});
