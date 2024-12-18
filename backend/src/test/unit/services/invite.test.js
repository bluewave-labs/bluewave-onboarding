const { describe, it, beforeEach } = require("mocha");
const sinon = require("sinon");
const { expect } = require("chai");
const db = require("../../../models/index.js");
const { UserBuilder, validList } = require("../../mocks/user.mock.js");
const InviteService = require("../../../service/invite.service");

const validEmailList = validList.map((it) => ({
  invitedBy: 1,
  invitedEmail: it.email,
  role: "admin",
}));
const Invite = db.Invite;
const User = db.User;
const user = UserBuilder.user;
const service = new InviteService();

describe("Test invite service", () => {
  const UserMock = {};
  const InviteMock = {};
  beforeEach(sinon.restore);
  it("sendInvite - should throw an error if the email is already registered", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(user().build());
    try {
      await service.sendInvite(1, "email@email.com", "admin");
    } catch (e) {
      expect(e).to.be.instanceOf(Error);
      expect(e.message).to.be.equal(
        "Error Sending Invite ~ Invited User already exists in team"
      );
    }
  });
  it("sendInvite - should update the invite if the email was invited but not registered", async () => {
    const update = sinon.stub();
    UserMock.findOne = sinon.stub(User, "findOne").resolves(null);
    InviteMock.findOne = sinon
      .stub(Invite, "findOne")
      .resolves({ ...user().build(), update });
    await service.sendInvite(1, "email@email.com", "admin");
    expect(update.called).to.be.true;
    expect(update.args[0][0]).to.deep.equal({
      invitedBy: 1,
      role: "1",
    });
  });
  it("sendInvite - should create an invite if the email was not invited yet.", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(null);
    InviteMock.findOne = sinon.stub(Invite, "findOne").resolves(null);
    InviteMock.create = sinon.stub(Invite, "create").resolves();
    await service.sendInvite(1, "email@email.com", "admin");
    expect(InviteMock.create.called).to.be.true;
    expect(InviteMock.create.args[0][0]).to.deep.equal({
      invitedBy: 1,
      role: "1",
      invitedEmail: "email@email.com",
    });
  });
  it("sendInvite -  should throw an error if something goes wrong", async () => {
    UserMock.findOne = sinon.stub(User, "findOne").resolves(null);
    InviteMock.findOne = sinon.stub(Invite, "findOne").rejects();
    try {
      await service.sendInvite(1, "email@email.com", "admin");
    } catch (e) {
      expect(e).to.be.instanceOf(Error);
      expect(e.message).to.be.equal("Error Sending Invite ~ Error");
    }
  });
  it("getAllInvites - should return all the invites", async () => {
    InviteMock.findAll = sinon.stub(Invite, "findAll").resolves(validEmailList);
    const result = await service.getAllInvites();
    expect(result).to.be.deep.equal(validEmailList);
    expect(InviteMock.findAll.called).to.be.true;
  });
  it("getAllInvites - should throw an error if something goes wrong", async () => {
    InviteMock.findAll = sinon.stub(Invite, "findAll").rejects();
    try {
      await service.getAllInvites();
    } catch (e) {
      expect(e).to.be.instanceOf(Error);
      expect(e.message).to.be.equal("Failed to fetch invites");
    }
  });
});
