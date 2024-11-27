import { expect } from "chai";
import { after, afterEach, before, beforeEach, describe } from "mocha";
import waitOn from "wait-on";
import app from "../../../index.js";
import db from "../../models/index.js";
import mocks from "../mocks/popupLog.mock.js";
import chai from "./index.js";

const dbReadyOptions = {
  resources: ["tcp:localhost:5432"],
  delay: 1000,
  timeout: 30000,
  interval: 1000,
};

const popupLog = mocks.PopupLogBuilder.popupLog;
const popupLogList = mocks.popupLogList;

const createPopupLog = async (log) => {
  const res = await chai.request
    .execute(app)
    .post("/api/popup_log/add_popup_log")
    .send(log);
  return res.body;
};

describe("E2e tests helperLink", () => {
  describe("POST /api/popup_log/add_popup_log", () => {
    before(async () => {
      db.sequelize.connectionManager.initPools();
    });
    after(async () => {
      const conn = await db.sequelize.connectionManager.getConnection();
      db.sequelize.connectionManager.releaseConnection(conn);
    });

    beforeEach(async () => {
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 400 if popupType is missing", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupLog().missingPopupType().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: ["popupType is required", "Invalid popupType"],
      });
    });
    it("should return 400 if popupType is invalid", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupLog().invalidPopupType().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({ errors: ["Invalid popupType"] });
    });
    it("should return 400 if userId is missing", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupLog().missingUserId().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: ["userId is required", "userId must be a non-empty string"],
      });
    });
    it("should return 400 if userId is invalid", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupLog().invalidUserId().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: ["userId must be a non-empty string"],
      });
    });
    it("should return 400 if completed is missing", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupLog().missingCompleted().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: ["Invalid value", "completed must be a boolean value"],
      });
    });
    it("should return 400 if completed is invalid", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupLog().invalidCompleted().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: ["completed must be a boolean value"],
      });
    });
    it("should return 201 if all fields are valid", async () => {
      const popupInfo = popupLog().build();
      const res = await chai.request
        .execute(app)
        .post("/api/popup_log/add_popup_log")
        .send(popupInfo);
      expect(res).to.have.status(201);
      const { showingTime, id, ...rest } = res.body;
      const { showingTime: s, ...expected } = popupInfo;
      expect(rest).to.deep.equal(expected);
      expect(Date.parse(showingTime)).to.be.closeTo(
        Date.parse(new Date()),
        1000
      );
    });
  });
  describe("POST /api/popup_log/get_popup_logs", () => {
    before(async () => {
      db.sequelize.connectionManager.initPools();
    });
    after(async () => {
      const conn = await db.sequelize.connectionManager.getConnection();
      db.sequelize.connectionManager.releaseConnection(conn);
    });

    beforeEach(async () => {
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 200 and an empty array if no logs", async () => {
      await Promise.all(popupLogList.map((log) => createPopupLog(log)));
      const res = await chai.request
        .execute(app)
        .get("/api/popup_log/get_popup_logs");
      expect(res).to.have.status(200);
      expect(res.body).to.be.have.length(5);
    });
  });
});
