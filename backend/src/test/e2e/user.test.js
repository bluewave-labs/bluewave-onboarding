import { use } from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import app from "../../../index.js";
import mocks from "../mocks/user.mock.js";

const chai = use(chaiHttp);

describe("E2e tests user", () => {
  const api = chai.request.execute(app);
  beforeEach(() => {
    api.post("/register").send(mocks.validList[0]);
  });
  it("GET /users-list - if everything goes right, should return a list of users with pagination and status code 200", async () => {});
  it.skip("GET /users-list - if something goes wrong, should return status code 500 and the title error code GET_USER_LIST_ERROR", async () => {});
  it.skip("GET /current-user - if everything goes right, should return the user without the password", async () => {});
  it.skip("GET /current-user - if the user is not found, should return status code 400 and the error 'User not found'", async () => {});
  it.skip("GET /current-user - if something goes wrong, should return status code 500 and the title error code GET_USER_ERROR", async () => {});
  it.skip("PUT /update - if everything goes right, should return the updated user without the password", async () => {});
  it.skip("PUT /update - if something goes wrong, should return status code 500 and the title error code UPDATE_USER_ERROR", async () => {});
  it.skip("DELETE /delete - if everything goes right, should return the message 'User deleted successfully'", async () => {});
  it.skip("DELETE /delete - if something goes wrong, should return status code 500 and the title error code DELETE_USER_ERROR", async () => {});
});
