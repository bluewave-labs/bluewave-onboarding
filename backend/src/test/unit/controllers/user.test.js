const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const { userService } = require("../../../controllers/user.controller.js");
const controller = require("../../../controllers/user.controller.js");
const sinon = require("sinon");
const mocks = require("../../mocks/user.mock.js");
const settings = require("../../../../config/settings.js");
const { validationResult } = require("express-validator");

describe("Unit test user controller", () => {
  const req = {};
  const res = {};
  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  afterEach(sinon.restore);
  it("getUsersList - if everything goes right, should return a list of users with pagination and status code 200", async () => {
    const users = sinon
      .stub(userService, "getUsers")
      .resolves({ rows: mocks.validList.slice(0, 2), count: 5 });
    req.query = { page: 1, limit: 2, search: "Jane" };
    await controller.getUsersList(req, res);
    expect(users.calledWith({ page: 1, limit: 2, search: "Jane" })).to.be.true;
    expect(res.status.args[0][0]).to.be.equal(200);
    expect(res.json.args[0][0]).to.be.deep.equal({
      users: mocks.validList.slice(0, 2).map((user) => ({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: settings.user.roleName[user.role],
      })),
      totalPages: 3,
      currentPage: 1,
      totalUsers: 5,
    });
  });
  it("getUsersList - if something goes wrong, should return status code 500 and the title error code GET_USER_LIST_ERROR", async () => {
    sinon.stub(userService, "getUsers").rejects();
    req.query = { page: 1, limit: 2, search: "Jane" };
    await controller.getUsersList(req, res);
    expect(res.status.args[0][0]).to.be.equal(500);
    expect(res.json.args[0][0]).to.be.deep.equal({
      error: "Internal Server Error",
      message: "Error",
      errorCode: "GET_USER_LIST_ERROR",
    });
  });
  it("getCurrentUser - if everything goes right, should return the user without the password", async () => {
    const users = sinon.stub(userService, "getUser").resolves(mocks.validUser);
    req.user = mocks.validUser;
    await controller.getCurrentUser(req, res);
    expect(users.calledWith(1)).to.be.true;
    expect(res.status.args[0][0]).to.be.equal(200);
    expect(res.json.args[0][0]).not.to.be.deep.equal(mocks.validUser);
    expect(res.json.args[0][0]).not.to.have.property("password");
  });
  it("getCurrentUser - if the user is not found, should return status code 400 and the error 'User not found'", async () => {
    const users = sinon.stub(userService, "getUser").resolves(null);
    req.user = mocks.validUser;
    await controller.getCurrentUser(req, res);
    expect(users.calledWith(1)).to.be.true;
    expect(res.status.args[0][0]).to.be.equal(400);
    expect(res.json.args[0][0]).to.be.deep.equal({ error: "User not found" });
  });
  it("getCurrentUser - if something goes wrong, should return status code 500 and the title error code GET_USER_ERROR", async () => {
    const users = sinon.stub(userService, "getUser").rejects();
    req.user = mocks.validUser;
    await controller.getCurrentUser(req, res);
    expect(users.calledWith(1)).to.be.true;
    expect(res.status.args[0][0]).to.be.equal(500);
    expect(res.json.args[0][0]).to.be.deep.equal({
      error: "Internal Server Error",
      errorCode: "GET_USER_ERROR",
      message: "Error",
    });
  });
  it("updateUserDetails - if everything goes right, should return the updated user without the password", async () => {
    const users = sinon
      .stub(userService, "updateUser")
      .resolves(mocks.validUser);
    req.user = mocks.validUser;
    req.body = {
      name: "Joana",
      surname: "D'ark",
    };
    await controller.updateUserDetails(req, res);
    expect(users.args[0]).to.be.deep.equal([
      1,
      { name: "Joana", surname: "D'ark" },
    ]);
    expect(res.status.args[0][0]).to.be.equal(200);
    expect(res.json.args[0][0]).to.be.deep.equal({
      updated: true,
      user: {
        name: "Jane",
        surname: "Doe",
      },
    });
  });
  it("updateUserDetails - if something goes wrong, should return status code 500 and the title error code UPDATE_USER_ERROR", async () => {
    const users = sinon.stub(userService, "updateUser").rejects();
    req.user = mocks.validUser;
    req.body = {
      name: "Joana",
      surname: "D'ark",
    };
    await controller.updateUserDetails(req, res);
    expect(users.args[0]).to.be.deep.equal([
      1,
      { name: "Joana", surname: "D'ark" },
    ]);
    expect(res.status.args[0][0]).to.be.equal(500);
    expect(res.json.args[0][0]).to.be.deep.equal({
      error: "Internal Server Error",
      errorCode: "UPDATE_USER_ERROR",
      message: "Error",
    });
  });
  it("deleteUser - if everything goes right, should return the message 'User deleted successfully'", async () => {
    const users = sinon.stub(userService, "deleteUser").resolves();
    req.user = mocks.validUser;
    await controller.deleteUser(req, res);
    expect(users.called).to.be.true;
    expect(res.status.args[0][0]).to.be.equal(200);
    expect(res.json.args[0][0]).to.be.deep.equal({
      message: "User deleted successfully",
    });
  });
  it("deleteUser - if something goes wrong, should return status code 500 and the title error code DELETE_USER_ERROR", async () => {
    const users = sinon.stub(userService, "deleteUser").rejects();
    req.user = mocks.validUser;
    await controller.deleteUser(req, res);
    expect(users.called).to.be.true;
    expect(res.status.args[0][0]).to.be.equal(500);
    expect(res.json.args[0][0]).to.be.deep.equal({
      error: "Internal Server Error",
      errorCode: "DELETE_USER_ERROR",
      message: "Error",
    });
  });
  describe("test the user middlewares", () => {
    let next;
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("checkAtLeastOneField - should return status 400 if all of 'name', 'surname' and 'picture' are empty", async () => {
      next = sinon.stub();
      req.user = mocks.validUser;
      req.body = {};
      await controller.checkAtLeastOneField(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.json.args[0][0]).to.be.deep.equal({
        updated: false,
        error: "Error, no value(s) provided to update",
      });
      expect(next.called).to.be.false;
    });
    it("checkAtLeastOneField - should move on if one of the fields is provided", async () => {
      next = sinon.stub();
      req.user = mocks.validUser;
      req.body = { name: "Jane" };
      await controller.checkAtLeastOneField(req, res, next);
      expect(res.status.called).to.be.false;
      expect(res.json.called).to.be.false;
      expect(next.called).to.be.true;
    });
  });
});
