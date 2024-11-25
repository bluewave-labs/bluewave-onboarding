import { expect } from "chai";
import { afterEach, beforeEach, describe, it } from "mocha";
import waitOn from "wait-on";
import app from "../../../index.js";
import db from "../../models/index.js";
import mocks from "../mocks/helperLink.mock.js";
import { UserBuilder, validList } from "../mocks/user.mock.js";
import chai from "./index.js";

const user = UserBuilder.user;
const dbReadyOptions = {
  resources: ["tcp:localhost:5432"],
  delay: 1000,
  timeout: 30000,
  interval: 1000,
};

const helper = mocks.HelperLinkBuilder.helperLink;
const link = mocks.LikBuilder.link;

const createHelper = async (token, helper) => {
  const { links, createdBy, id, ...helperData } = helper;
  const res = await chai.request
    .execute(app)
    .post("/api/helper-link/add_helper")
    .set("Authorization", `Bearer ${token}`)
    .send({ ...helperData, links: [] });
  return res.body;
};

describe.only("E2e tests auth", () => {
  describe("POST /api/helper-link/add_helper", () => {
    let token;
    beforeEach(async () => {
      process.env.NODE_ENV = "test";
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      token = login.body.token;
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 401 if no token is provided", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper");
      expect(res).to.have.status(401);
      expect(res.body).to.be.deep.equal({ error: "No token provided" });
    });
    it("should return 400 if title is missing", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send(helper().missingTitle().build());
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [{ msg: "header is required" }],
      });
    });
    it("should return 400 if the colors are invalid", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send(
          helper()
            .invalidHeaderBackgroundColor()
            .invalidIconColor()
            .invalidLinkFontColor()
            .build()
        );
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [
          { msg: "headerBackgroundColor must be a valid hex color code" },
        ],
      });
    });
    it("should return 400 if link is missing title", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...helper().build(), links: [link().missingTitle().build()] });
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [{ msg: "title and url are required" }],
      });
    });
    it("should return 400 if link is missing url", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...helper().build(), links: [link().missingUrl().build()] });
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [{ msg: "title and url are required" }],
      });
    });
    it("should return 400 if link has invalid url", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...helper().build(), links: [link().invalidUrl().build()] });
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [{ msg: "Invalid value for url" }],
      });
    });
    it("should return 400 if link has invalid order value", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...helper().build(),
          links: [link().invalidOrderValue().build()],
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [{ msg: "Invalid value for order" }],
      });
    });
    it("should return 400 if link has invalid order type", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...helper().build(),
          links: [link().invalidOrderType().build()],
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.deep.equal({
        errors: [{ msg: "Invalid value for order" }],
      });
    });
    it("should return 201 if all data is valid", async () => {
      const res = await chai.request
        .execute(app)
        .post("/api/helper-link/add_helper")
        .set("Authorization", `Bearer ${token}`)
        .send(helper().build());
      expect(res).to.have.status(201);
      const { links, ...expected } = helper().build();
      expect(res.body).to.be.deep.equal(expected);
    });
  });
  describe("GET /api/helper-link/get_helpers", () => {
    let token;
    beforeEach(async () => {
      process.env.NODE_ENV = "test";
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      token = login.body.token;
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 401 if no token is provided", async () => {
      const res = await chai.request
        .execute(app)
        .get("/api/helper-link/get_helpers");
      expect(res).to.have.status(401);
      expect(res.body).to.be.deep.equal({ error: "No token provided" });
    });
    it("should return 200 and the helpers created by the user if token is provided", async () => {
      await Promise.all(
        mocks.HelperLinkListUser1.map(async (helper) => {
          return await createHelper(token, helper);
        })
      );
      await chai.request
        .execute(app)
        .post("/api/team/invite")
        .set("Authorization", `Bearer ${token}`)
        .send({ invitedEmail: validList[1].email, role: "member" });
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send({ ...validList[1], role: 2 });
      const newToken = login.body.token;
      await Promise.all(
        mocks.HelperLinkListUser2.map(async (helper) => {
          return await createHelper(newToken, helper);
        })
      );
      const res = await chai.request
        .execute(app)
        .get("/api/helper-link/get_helpers")
        .set("Authorization", `Bearer ${token}`);
      expect(res).to.have.status(200);
      mocks.HelperLinkListUser1.forEach((helper) => {
        const {
          creator,
          createdBy: c,
          id: i,
          ...curr
        } = res.body.find((it) => it.title === helper.title);
        const { createdBy, links, id, ...expected } = helper;
        expect(curr).to.be.deep.equal(expected);
        expect(creator).to.have.property("id", createdBy);
      });
      mocks.HelperLinkListUser2.forEach((helper) => {
        expect(res.body).to.not.include(helper);
      });
    });
  });
  describe.skip("GET /api/helper-link/all_helpers", () => {
    let token;
    beforeEach(async () => {
      process.env.NODE_ENV = "test";
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      token = login.body.token;
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 401 if no token is provided", async () => {});
  });
  describe.skip("GET /api/helper-link/get_helper/:id", () => {
    let token;
    beforeEach(async () => {
      process.env.NODE_ENV = "test";
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      token = login.body.token;
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 401 if no token is provided", async () => {});
  });
  describe.skip("PUT /api/helper-link/edit_helper/:id", () => {
    let token;
    beforeEach(async () => {
      process.env.NODE_ENV = "test";
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      token = login.body.token;
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 401 if no token is provided", async () => {});
  });
  describe.skip("DELETE /api/helper-link/delete_helper/:id", () => {
    let token;
    beforeEach(async () => {
      process.env.NODE_ENV = "test";
      try {
        await waitOn(dbReadyOptions);
      } catch (err) {
        console.error("Database not ready in time:", err);
        throw err;
      }
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      token = login.body.token;
    });
    afterEach(async () => {
      await db.sequelize.sync({ force: true, match: /_test$/ });
    });
    it("should return 401 if no token is provided", async () => {});
  });
});
