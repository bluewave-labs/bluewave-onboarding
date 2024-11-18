import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { before, describe, it } from "mocha";
import app from "../../../index.js";
import mocks from "../mocks/user.mock.js";

const chai = use(chaiHttp);

describe("E2e tests user", () => {
  let token;
  before(async () => {
    const login = await chai.request
      .execute(app)
      .post("/api/auth/register")
      .send(mocks.validUser);
    token = login.body.token;
  });
  describe("GET /api/users/users-list", () => {
    it("should return a list of users with pagination and status code 200 if everything goes right", async () => {
      const result = await chai.request
        .execute(app)
        .get("/api/users/users-list ");
      expect(result.status).to.be.equal(200);
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
  describe("GET /api/users/current-user", () => {
    it("should fail if the user is not logged", async () => {
      const result = await chai.request
        .execute(app)
        .get("/api/users/current-user");
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({
        error: "No token provided",
      });
    });
    it("should return the user without the password if everything goes right", async () => {
      const {
        password,
        picture: p,
        createdAt: c,
        ...expected
      } = mocks.validUser;
      const result = await chai.request
        .execute(app)
        .get("/api/users/current-user")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).to.be.equal(200);
      const { picture, createdAt, ...body } = result.body.user;
      expect(body).to.be.deep.equal({ ...expected, role: "admin" });
    });
  });
  describe("PUT /api/users/update", () => {
    it("should fail if the user is not logged", async () => {
      const result = await chai.request.execute(app).put("/api/users/update");
      expect(result.status).to.be.equal(401);
      expect(result.body).to.deep.equal({ error: "No token provided" });
    });
    it("should fail if the request body is empty", async () => {
      const result = await chai.request
        .execute(app)
        .put("/api/users/update")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).to.be.equal(400);
      expect(result.body).to.deep.equal({
        updated: false,
        error: "Error, no value(s) provided to update",
      });
    });
    it("if everything goes right, should return the updated user without the password", async () => {
      const { password, createdAt: c, ...expected } = mocks.validUser;
      const result = await chai.request
        .execute(app)
        .put("/api/users/update")
        .set("Authorization", `Bearer ${token}`)
        .send({ photo: "https://picsum.photos/200/300" });
      expect(result.status).to.be.equal(200);
      const { createdAt, ...body } = result.body.user;
      expect(body).to.be.deep.equal({
        ...expected,
        role: "admin",
        picture: "https://picsum.photos/200/300",
      });
    });
  });
  describe("DELETE /api/users/delete", () => {
    it("should return the message 'User deleted successfully' if everything goes right", async () => {
      const result = await chai.request
        .execute(app)
        .delete("/api/users/delete");
      expect(result.status).to.be.equal(401);
      expect(result.body).to.deep.equal({
        error: "No token provided",
      });
    });
    it("should return status code 500 and the title error code DELETE_USER_ERROR if something goes wrong", async () => {
      const result = await chai.request
        .execute(app)
        .delete("/api/users/delete")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal({
        message: "User deleted successfully",
      });
    });
  });
});
