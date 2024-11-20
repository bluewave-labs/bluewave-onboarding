import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import app from "../../../index.js";
import db from "../../models/index.js";
import mocks from "../mocks/user.mock.js";

const chai = use(chaiHttp);
const user = mocks.UserBuilder.user;

describe.only("E2e tests auth", () => {
  describe("POST /api/auth/register", () => {
    it("should return the user info and a token if everything goes right", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().build());
      expect(result).to.have.status(201);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        user: {
          email: "jane.doe@email.com",
          id: 1,
          name: "Jane",
          role: "admin",
          surname: "Doe",
        },
      });
      expect(result.body).to.have.property("token");
    });
    it("should return status 400 in the name has an invalid format", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().invalidName().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: ["Name can only contain letters, hyphens and apostrophes"],
      });
    });
    it("should return status 400 in the surname has an invalid format", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().invalidSurname().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: ["Name can only contain letters, hyphens and apostrophes"],
      });
    });
    it.only("should return status 400 in the email has an invalid format", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().invalidEmail().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: ["Invalid email address"],
      });
    });
    it("should return status 400 in the password has an invalid format", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().invalidPasswordChar().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: ["Must contain one special character"],
      });

      await db.sequelize.sync({ force: true });
      const result2 = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().invalidPasswordLength().build());
      expect(result2).to.have.status(400);
      const { token: t, ...info2 } = result2.body;
      expect(info2).to.be.deep.equal({
        errors: ["Must be at least 8 characters"],
      });
    });
    it("should return status 400 in the name is missing", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().missingName().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: [
          "Name is required",
          "Name can only contain letters, hyphens and apostrophes",
        ],
      });
    });
    it("should return status 400 in the surname is missing", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().missingSurname().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: [
          "Surname is required",
          "Name can only contain letters, hyphens and apostrophes",
        ],
      });
    });
    it("should return status 400 in the email is missing", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().missingEmail().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: ["Invalid email address"],
      });
    });
    it("should return status 400 in the password is missing", async () => {
      await db.sequelize.sync({ force: true });
      const result = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(user().missingPassword().build());
      expect(result).to.have.status(400);
      const { token, ...info } = result.body;
      expect(info).to.be.deep.equal({
        errors: [
          "Must be at least 8 characters",
          "Must contain one special character",
        ],
      });
    });
  });
  describe.skip("POST /api/auth/login", () => {
    it("should return the user info and a token if everything goes right", async () => {
      const result = await chai.request
        .execute(app)
        .get("/api/auth/current-user");
      expect(result).to.have.status(401);
      expect(result.body).to.be.deep.equal({
        error: "No token provided",
      });
    });
    it("should return status 400 in the email has an invalid format", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the password has an invalid format", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the email is empty", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the password is empty", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
  });
  describe.skip("POST /api/auth/logout", () => {
    let token;
    beforeEach(async () => {
      await db.sequelize.sync({ force: true });
      const login = await chai.request
        .execute(app)
        .post("/api/auth/register")
        .send(mocks.validUser);
      token = login.body.token;
    });
    it("should return status 200 and message if everything is right", async () => {
      const result = await chai.request.execute(app).put("/api/auth/update");
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ error: "No token provided" });
    });
    it("should fail if the token is invalid or missing", async () => {
      const result = await chai.request
        .execute(app)
        .put("/api/auth/update")
        .set("Authorization", `Bearer ${token}`);
      expect(result).to.have.status(400);
      expect(result.body).to.deep.equal({
        updated: false,
        error: "Error, no value(s) provided to update",
      });
    });
  });
  describe.skip("POST /api/auth/forget-password", () => {
    it("should return status 200 and message if everything is right", async () => {
      const result = await chai.request.execute(app).delete("/api/auth/delete");
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({
        error: "No token provided",
      });
    });
    it("should return status 400 in the email has an invalid format", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the email is empty", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
  });
  describe.skip("POST /api/auth/reset-password", () => {
    it("should return the user info and a token if everything goes right", async () => {
      const result = await chai.request
        .execute(app)
        .get("/api/auth/current-user");
      expect(result).to.have.status(401);
      expect(result.body).to.be.deep.equal({
        error: "No token provided",
      });
    });
    it("should return status 400 in the token has an invalid format", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the new password has an invalid format", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the token is empty", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
    it("should return status 400 in the new password is empty", async () => {
      const result = await chai.request.execute(app).get("/api/auth/register ");
      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: [
          {
            email: "jane.doe@email.com",
            name: "Jane",
            role: "admin",
            surname: "Doe",
          },
        ],
      });
    });
  });
});
