const { describe, it, beforeEach, afterEach } = require("mocha");
const sinon = require("sinon");
const { expect } = require("chai");
const db = require("../../../models/index.js");
const { UserBuilder, validList } = require("../../mocks/user.mock.js");
const TeamService = require("../../../service/team.service.js");

const Invite = db.Invite;
const User = db.User;
const Team = db.Team;
const Token = db.Token;
const user = UserBuilder.user;
const service = new TeamService();

describe("Test team service", () => {
  const UserMock = {};
  const TeamMock = {};
  const InviteMock = {};
  const TokenMock = {};
  let commit;
  let rollback;
  beforeEach(() => {
    commit = sinon.spy();
    rollback = sinon.spy();
    sinon.stub(db.sequelize, "transaction").callsFake(async () => ({
      commit,
      rollback,
    }));
  });
  afterEach(sinon.restore);
  it("createTeam - should create the team", async () => {
    TeamMock.create = sinon
      .stub(Team, "create")
      .resolves({ id: 1, name: "team" });
    const team = await service.createTeam("team");
    expect(team).to.deep.equal({ id: 1, name: "team" });
    expect(commit.called).to.be.true;
  });
  it("createTeam - should rollback the transaction and throw an error if something goes wrong", async () => {
    TeamMock.create = sinon.stub(Team, "create").rejects();
    try {
      await service.createTeam("team");
    } catch (err) {
      expect(rollback.called).to.be.true;
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal("Failed to create team");
    }
  });
  it("getTeam - should return the team and the users on the team if every thing goes right", async () => {
    TeamMock.findOne = sinon
      .stub(Team, "findOne")
      .resolves({ id: 1, name: "team" });
    UserMock.findAll = sinon.stub(User, "findAll").resolves(validList);
    const team = await service.getTeam();
    expect(team).to.deep.equal({
      team: { id: 1, name: "team" },
      users: validList,
    });
  });
  it("getTeam - should throw an error if something goes wrong", async () => {
    TeamMock.findOne = sinon.stub(Team, "findOne").rejects();
    try {
      await service.getTeam();
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal("Failed to retrieve team");
    }
  });
  it("getTeamCount - should return an object with a boolean if the teamCount is bigger than 0", async () => {
    TeamMock.count = sinon.stub(Team, "count").resolves(1);
    const teamCount = await service.getTeamCount();
    expect(teamCount).to.deep.equal({ teamExists: true });
  });
  it("getTeamCount - should throw an error if something goes wrong", async () => {
    TeamMock.count = sinon.stub(Team, "count").rejects();
    try {
      await service.getTeamCount();
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal("Failed to get team count");
    }
  });
  it("updateTeam - should update the teams name", async () => {
    TeamMock.update = sinon.stub(Team, "update").resolves(1);
    await service.updateTeam("newName");
    expect(commit.called).to.be.true;
    const params = TeamMock.update.getCall(0).args;
    expect(params[0]).to.deep.equal({
      name: "newName",
    });
    expect(params[1]).to.deep.equal({
      where: {},
    });
  });
  it("updateTeam - should throw an error if something goes wrong", async () => {
    TeamMock.update = sinon.stub(Team, "update").rejects();
    try {
      await service.updateTeam("newName");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal("Error Updating Team");
    }
  });
  it("removeUserFromTeam - should throw an error if the userId is equal to the memberId", async () => {
    try {
      await service.removeUserFromTeam(1, 1);
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal(
        "Failed to remove user from team ~ User can't remove itself through team list"
      );
    }
  });
  it("removeUserFromTeam - should throw an error if the user to be removed is not found", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(null);
    try {
      await service.removeUserFromTeam(1, 2);
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal(
        "Failed to remove user from team ~ User to be removed not found"
      );
    }
  });
  it("removeUserFromTeam - should remove the user, the invite and the token if everything goes right", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(user().build());
    InviteMock.destroy = sinon.stub(Invite, "destroy").resolves(1);
    UserMock.destroy = sinon.stub(User, "destroy").resolves(1);
    TokenMock.destroy = sinon.stub(Token, "destroy").resolves(1);
    await service.removeUserFromTeam(1, 2);
    expect(commit.called).to.be.true;
  });
  it("removeUserFromTeam - should throw an error if something goes wrong", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(user().build());
    UserMock.destroy = sinon.stub(User, "destroy").rejects();
    try {
      await service.removeUserFromTeam(1, 2);
    } catch (err) {
      expect(rollback.called).to.be.true;
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal(
        "Failed to remove user from team ~ Error"
      );
    }
  });
  it("updateUserRole - should throw an error if the member is not found", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(null);
    try {
      await service.updateUserRole(1, "member");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal(
        "Failed to update user role ~ User Not Found"
      );
      expect(rollback.called).to.be.true;
    }
  });
  it("updateUserRole - should throw an error if the team has only one admin", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(user().build());
    UserMock.count = sinon.stub(User, "count").resolves(1);
    try {
      await service.updateUserRole(1, "member");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal("Failed to update user role ~ ");
      expect(rollback.called).to.be.true;
    }
  });
  it("updateUserRole - should update the role", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(user().build());
    UserMock.count = sinon.stub(User, "count").resolves(2);
    UserMock.update = sinon
      .stub(User, "update")
      .resolves({ ...user().build(), role: "member" });
    await service.updateUserRole(1, "member");
    expect(commit.called).to.be.true;
    expect(UserMock.update.called).to.be.true;
    const params = UserMock.update.getCall(0).args;
    expect(params[0]).to.deep.equal({
      role: "2",
    });
    expect(params[1]).to.deep.equal({
      where: { id: 1 },
    });
  });
  it("updateUserRole - should throw an error if something goes wrong", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(user().build());
    UserMock.count = sinon.stub(User, "count").resolves(2);
    UserMock.update = sinon.stub(User, "update").rejects();
    try {
      await service.updateUserRole(1, "member");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal("Failed to update user role ~ Error");
      expect(rollback.called).to.be.true;
    }
  });
});
