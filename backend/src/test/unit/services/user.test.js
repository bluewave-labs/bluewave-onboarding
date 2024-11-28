const { describe, it, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const db = require("../../../models/index.js");
const UserService = require("../../../service/user.service.js");
const mocks = require("../../mocks/user.mock.js");

const service = new UserService();

describe("Unit test user service", () => {
  let User;
  let Invite;
  let Token;
  let Sequelize;
  let commit;
  let rollback;
  beforeEach(() => {
    commit = sinon.spy();
    rollback = sinon.spy();
    sinon.stub(db.sequelize, "transaction").callsFake(async () => ({
      commit,
      rollback,
    }));
    Sequelize = sinon.spy(db, "Sequelize");
  });
  afterEach(() => {
    sinon.restore();
  });
  it("getUser - should throw an error if something goes wrong", async () => {
    User = sinon.stub(db.User, "findOne").rejects();
    try {
      await service.getUser(1);
    } catch (err) {
      expect(err).to.have.property("message", "Error retrieving User by ID");
      expect(err).to.be.instanceOf(Error);
    }
    expect(User.callCount).to.be.equal(1);
    expect(
      User.calledWith({
        where: { id: 1 },
      })
    ).to.be.true;
  });
  it("getUser - should return the user if everything is ok", async () => {
    User = sinon.stub(db.User, "findOne").resolves(mocks.validUser);
    const user = await service.getUser(1);
    expect(User.threw()).to.be.false;
    expect(User.callCount).to.be.equal(1);
    expect(
      User.calledWith({
        where: { id: 1 },
      })
    ).to.be.true;
    expect(user).to.be.equal(mocks.validUser);
  });
  it("getUsers - should return all the users if the search param is an empty string", async () => {
    User = sinon
      .stub(db.User, "findAndCountAll")
      .resolves(mocks.validList.slice(0, 2));
    const users = await service.getUsers({ search: "", page: 1, limit: 2 });

    expect(
      User.calledWith({
        where: {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.like]: `%%`,
              },
            },
            {
              surname: {
                [Sequelize.Op.like]: `%%`,
              },
            },
          ],
        },
        limit: 2,
        offset: 0,
      })
    ).to.be.true;
    expect(users).not.to.be.equal(mocks.validList);
    expect(users).to.have.length(2);
  });
  it("getUsers - should filter users when search param is provided", async () => {
    User = sinon
      .stub(db.User, "findAndCountAll")
      .resolves(mocks.validList.filter((u) => u.name.includes("Harry")));
    await service.getUsers({ search: "Harry", page: 1, limit: 2 });
    const params = User.getCall(0).args[0];
    expect(params).to.be.deep.equal({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.like]: `%Harry%` } },
          { surname: { [Sequelize.Op.like]: `%Harry%` } },
        ],
      },
      limit: 2,
      offset: 0,
    });
  });
  it("getUsers - should return the correct pagination when the page changes", async () => {
    User = sinon
      .stub(db.User, "findAndCountAll")
      .onFirstCall()
      .resolves(mocks.validList.slice(0, 2))
      .onSecondCall()
      .resolves(mocks.validList.slice(2, 4));
    const firstList = await service.getUsers({ search: "", page: 1, limit: 2 });
    expect(
      User.calledWith({
        where: {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.like]: `%%`,
              },
            },
            {
              surname: {
                [Sequelize.Op.like]: `%%`,
              },
            },
          ],
        },
        limit: 2,
        offset: 0,
      })
    ).to.be.true;
    expect(firstList).not.to.be.equal(mocks.validList);
    expect(firstList).to.have.length(2);
    const secondList = await service.getUsers({
      search: "",
      page: 2,
      limit: 2,
    });
    expect(
      User.calledWith({
        where: {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.like]: `%%`,
              },
            },
            {
              surname: {
                [Sequelize.Op.like]: `%%`,
              },
            },
          ],
        },
        limit: 2,
        offset: 2,
      })
    ).to.be.true;
    expect(secondList).to.have.length(2);
    expect(secondList).not.to.be.equal(firstList);
  });
  it("getUsers - should throw the error message 'Error retrieving users list' if something goes wrong", async () => {
    User = sinon.stub(db.User, "findAndCountAll").rejects({});
    try {
      await service.getUsers({ search: "", page: 1, limit: 2 });
    } catch (error) {
      expect(error).to.have.property("message", "Error retrieving users list");
      expect(error).to.be.instanceOf(Error);
    }
    expect(
      User.calledWith({
        where: {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.like]: `%%`,
              },
            },
            {
              surname: {
                [Sequelize.Op.like]: `%%`,
              },
            },
          ],
        },
        limit: 2,
        offset: 0,
      })
    ).to.be.true;
    expect(User.callCount).to.be.equal(1);
  });
  it("updateUser - if the user is updated, should return the updated user", async () => {
    const details = {
      name: "Harry",
      surname: "Potter",
      email: "harry.potter@wizards.com",
    };
    User = sinon
      .stub(db.User, "update")
      .resolves([1, [{ ...mocks.validUser, ...details }]]);
    const user = await service.updateUser(1, details);
    expect(
      User.calledWith(details, {
        where: { id: 1 },
        returning: true,
      })
    ).to.be.true;
    expect(user).not.to.equal(mocks.validUser);
    expect(user).to.have.property("name", "Harry");
  });
  it("updateUser - if something goes wrong, should throw an error 'Error updating user'", async () => {
    const details = {
      name: "Harry",
      surname: "Potter",
      email: "harry.potter@wizards.com",
    };
    User = sinon.stub(db.User, "update").rejects();
    try {
      await service.updateUser(1, details);
    } catch (error) {
      expect(error).to.have.property("message", "Error updating user");
      expect(error).to.be.instanceOf(Error);
    }
    expect(
      User.calledWith(details, {
        where: { id: 1 },
        returning: true,
      })
    ).to.be.true;
  });
  it("deleteUser - if the user is the only admin role, should throw an error", async () => {
    sinon.stub(db.User, "findOne").resolves(mocks.validUser);
    sinon.stub(db.User, "count").resolves(1);
    User = sinon.stub(db.User, "destroy");
    Token = sinon.stub(db.Token, "destroy");
    Invite = sinon.stub(db.Invite, "destroy");
    try {
      await service.deleteUser(1);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        "Error deleting user ~ The team has only single admin and can't delete themselves"
      );
    }
    expect(User.called).to.be.false;
    expect(Invite.called).to.be.false;
    expect(Token.called).to.be.false;
    expect(commit.called).to.be.false;
    expect(rollback.called).to.be.true;
  });
  it("deleteUser - if the user is not the admin role, should delete the user, the invite and the token", async () => {
    sinon.stub(db.User, "findOne").resolves(mocks.validUser);
    sinon.stub(db.User, "count").resolves(2);
    User = sinon.stub(db.User, "destroy");
    Token = sinon.stub(db.Token, "destroy");
    Invite = sinon.stub(db.Invite, "destroy");

    const result = await service.deleteUser(1);
    expect(User.called).to.be.true;
    expect(Invite.called).to.be.true;
    expect(Token.called).to.be.true;
    expect(commit.called).to.be.true;
    expect(rollback.called).to.be.false;
  });
});
