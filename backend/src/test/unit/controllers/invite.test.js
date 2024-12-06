(async () => {
  const { describe, it, beforeEach, afterEach } = await import("mocha");
  const sinon = await import("sinon");
  const { expect } = await import("chai");
  const { validList } = require("../../mocks/user.mock.js");
  const controller = require("../../../controllers/invite.controller.js");

  const service = controller.inviteService;

  const validEmailList = validList.map((it) => ({
    invitedBy: 1,
    invitedEmail: it.email,
    role: "admin",
  }));

  describe("Test invite controller", () => {
    const serviceMock = {};
    const req = {};
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("sendTeamInvite - should return status 200 if everything works", async () => {
      req.user = { id: 1 };
      req.body = { invitedEmail: "email@email.com", role: "admin" };
      serviceMock.sendInvite = sinon.stub(service, "sendInvite").resolves();

      await controller.sendTeamInvite(req, res);
      const status = res.status.args[0][0];
      const body = res.json.args[0][0];
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({
        data: null,
        message: "Invite sent successfully",
        status: 200,
      });
    });
    it("sendTeamInvite - should return status 500 if something goes wrong", async () => {
      req.user = { id: 1 };
      req.body = { invitedEmail: "email@email.com", role: "admin" };
      serviceMock.sendInvite = sinon.stub(service, "sendInvite").rejects();

      await controller.sendTeamInvite(req, res);
      const status = res.status.args[0][0];
      const body = res.json.args[0][0];
      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "SEND_INVITE_ERROR",
        message: "Error",
      });
    });
    it("getAllInvites - should return all the invites", async () => {
      serviceMock.getAllInvites = sinon
        .stub(service, "getAllInvites")
        .resolves(validEmailList);

      await controller.getAllInvites(req, res);
      const status = res.status.args[0][0];
      const body = res.json.args[0][0];
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({
        invites: validEmailList,
        message: "Invites Retrieved Successfully",
        success: true,
      });
    });
    it("getAllInvites - should throw an error if something goes wrong", async () => {
      serviceMock.getAllInvites = sinon
        .stub(service, "getAllInvites")
        .rejects();

      await controller.getAllInvites(req, res);
      const status = res.status.args[0][0];
      const body = res.json.args[0][0];
      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({
        message: "Error",
        success: false,
      });
    });
  });
})();
