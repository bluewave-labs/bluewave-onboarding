import { beforeEach, describe, it, vi } from "vitest";
import db from "../../../models";

describe("Unit test user service", () => {
  let User;
  let Invite;
  let Token;
  let Sequelize;
  let sequelize;
  beforeEach(() => {
    User = vi.spyOn(db, "User");
    Invite = vi.spyOn(db, "Invite");
    Token = vi.spyOn(db, "Token");
    Sequelize = vi.spyOn(db, "Sequelize");
    sequelize = vi.spyOn(db, "sequelize");
  });
  it.todo("getUser - should throw an error if something goes wrong");
  it.todo("getUser - should return the user if everything is ok");
  it.todo(
    "getUsers - should return all the users if the search param is an empty string"
  );
  it.todo(
    "getUsers - should return filtered users if the search param has a match"
  );
  it.todo(
    "getUsers - should return an empty list if the search param doesn't have a match"
  );
  it.todo(
    "updateUser - if the user is updated, should return the updated user"
  );
  it.todo("updateUser - if the user is not updated, should throw an error");
  it.todo(
    "deleteUser - if the user is the only admin role, should throw an error"
  );
  it.todo(
    "deleteUser - if the user is not the admin role, should delete the user, the invite and the token"
  );
});
