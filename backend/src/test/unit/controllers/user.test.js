import { describe, it } from "vitest";

describe("Unit test user controller", () => {
  it.todo(
    "getUsersList - if everything goes right, should return a list of users with pagination and status code 200"
  );
  it.todo(
    "getUsersList - if something goes wrong, should return status code 500 and the title error code GET_USER_LIST_ERROR"
  );
  it.todo("getCurrentUser - if everything goes right, should return the user without the password");
  it.todo("getCurrentUser - if something goes wrong, should return status code 500 and the title error code GET_USER_ERROR");
  it.todo("updateUserDetails - if everything goes right, should return the updated user without the password");
  it.todo("updateUserDetails - if something goes wrong, should return status code 500 and the title error code UPDATE_USER_ERROR");
  it.todo("deleteUser - if everything goes right, should return the message 'User deleted successfully'");
  it.todo("deleteUser - if something goes wrong, should return status code 500 and the title error code DELETE_USER_ERROR");
});
