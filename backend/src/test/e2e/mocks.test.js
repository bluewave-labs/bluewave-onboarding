import { expect } from "chai";
import { before, describe } from "mocha";
import waitOn from "wait-on";
import app from "../../server.js";
import chai from "./index.js";

const dbReadyOptions = {
  resources: ["tcp:localhost:5432"],
  delay: 1000,
  timeout: 30000,
  interval: 1000,
};

describe("E2e tests popup", () => {
  before(async () => {
    try {
      await waitOn(dbReadyOptions);
    } catch (err) {
      console.error("Database not ready in time:", err);
      throw err;
    }
  });
  describe("GET /api/mock/popup", () => {
    it("should return 200 and a list with one popup when key is A", async () => {
      const res = await chai.request.execute(app).get("/api/mock/popup?key=A");
      expect(res).to.have.status(200);
      expect(res.body).to.be.deep.equal([
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
      ]);
    });
    it("should return 200 and a list with one popup when key is B", async () => {
      const res = await chai.request.execute(app).get("/api/mock/popup?key=B");
      expect(res).to.have.status(200);
      expect(res.body).to.be.deep.equal([
        {
          no: 1,
          headerText: "test header text1",
          headerBg: "#A2A2A2",
          contentHtml: "11",
          font: "14px",
          fontColor: "#AAAAAA",
          action: "close",
          actionButtonText: "Kapat/Close1",
          actionButtonColor: "#CCCCCC",
        },
        {
          no: 2,
          headerText: "test header text2",
          headerBg: "#A2A2A2",
          contentHtml: "22",
          font: "14px",
          fontColor: "#AAAAAA",
          action: "close",
          actionButtonText: "Kapat/Close2",
          actionButtonColor: "#CCCCCC",
        },
      ]);
    });
    it("should return 200 and an empty list when key is not A or B", async () => {
      const res = await chai.request.execute(app).get("/api/mock/popup?key=C");
      expect(res).to.have.status(200);
      expect(res.body).to.be.deep.equal([]);
    });
  });
  describe("GET /api/mock/onboard", () => {
    it("should return 200 and an object", async () => {
      const res = await chai.request.execute(app).get("/api/mock/onboard");
      expect(res).to.have.status(200);
      expect(res.body).to.be.deep.equal({
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
      });
    });
  });
  describe("POST /api/mock/onboard", () => {
    it("should return 200 and an object", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/mock/onboard")
        .send({ userId: "123" });
      expect(res).to.have.status(200);
      expect(res.body).to.be.deep.equal({
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
      });
    });
  });
});
