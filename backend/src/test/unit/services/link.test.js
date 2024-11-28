const { describe, it, beforeEach, afterEach } = require("mocha");
const db = require("../../../models/index.js");
const sinon = require("sinon");
const mocks = require("../../mocks/helperLink.mock.js");
const { expect } = require("chai");
const linkService = require("../../../service/link.service.js");

const Link = db.Link;

describe("Test link service", () => {
  const LinkMock = {};
  afterEach(sinon.restore);
  it("getAllLinks - should return a list of links with it's respective helper", async () => {
    LinkMock.findAll = sinon.stub(Link, "findAll").resolves(mocks.LinksList);
    const links = await linkService.getAllLinks();
    expect(links).to.deep.equal(mocks.LinksList);
    expect(LinkMock.findAll.called).to.be.true;
    const params = LinkMock.findAll.getCall(0).args[0];
    expect(params).to.be.deep.equal({
      include: [
        {
          model: db.HelperLink,
          as: "helper",
        },
      ],
    });
  });
  it("getLinksByHelperId - should return only the links related to the helper id", async () => {
    LinkMock.findAll = sinon.stub(Link, "findAll").resolves(mocks.LinksList);
    const links = await linkService.getLinksByHelperId(1);
    expect(links).to.deep.equal(mocks.LinksList);
    expect(LinkMock.findAll.called).to.be.true;
    const params = LinkMock.findAll.getCall(0).args[0];
    expect(params).to.be.deep.equal({
      where: {
        helperId: 1,
      },
      include: [
        {
          model: db.HelperLink,
          as: "helper",
        },
      ],
    });
  });
  it("createLink - should return the link created", async () => {
    const linkToCreate = mocks.LinkBuilder.link().build();
    LinkMock.create = sinon.stub(Link, "create").resolves(linkToCreate);
    const link = await linkService.createLink(linkToCreate);
    expect(link).to.deep.equal(linkToCreate);
    expect(LinkMock.create.called).to.be.true;
    const params = LinkMock.create.getCall(0).args[0];
    expect(params).to.be.deep.equal(linkToCreate);
  });
  it("deleteLink - should return true if the link was deleted", async () => {
    LinkMock.destroy = sinon.stub(Link, "destroy").resolves(1);
    const result = await linkService.deleteLink(1);
    expect(result).to.be.true;
    expect(LinkMock.destroy.called).to.be.true;
    const params = LinkMock.destroy.getCall(0).args[0];
    expect(params).to.be.deep.equal({ where: { id: 1 } });
  });
  it("deleteLink - should return false if the link wasn't deleted", async () => {
    LinkMock.destroy = sinon.stub(Link, "destroy").resolves(0);
    const result = await linkService.deleteLink(1);
    expect(result).to.be.false;
    expect(LinkMock.destroy.called).to.be.true;
    const params = LinkMock.destroy.getCall(0).args[0];
    expect(params).to.be.deep.equal({ where: { id: 1 } });
  });
  it("updateLink - if no links are updated, should return null", async () => {
    LinkMock.update = sinon.stub(Link, "update").resolves([0, []]);
    const link = await linkService.updateLink(1, {});
    expect(link).to.be.null;
    expect(LinkMock.update.called).to.be.true;
    const params = LinkMock.update.getCall(0).args;
    expect(params[0]).to.be.deep.equal({});
    expect(params[1]).to.be.deep.equal({ where: { id: 1 }, returning: true });
  });
  it("updateLink - should return the updated link", async () => {
    const linkToUpdate = mocks.LinkBuilder.link().build();
    LinkMock.update = sinon.stub(Link, "update").resolves([1, [linkToUpdate]]);
    const link = await linkService.updateLink(1, linkToUpdate);
    expect(link).to.deep.equal(linkToUpdate);
    expect(LinkMock.update.called).to.be.true;
    const params = LinkMock.update.getCall(0).args;
    expect(params[0]).to.be.deep.equal(linkToUpdate);
    expect(params[1]).to.be.deep.equal({ where: { id: 1 }, returning: true });
  });
  it("getLinkById - should return the link with it's helper", async () => {
    LinkMock.findOne = sinon
      .stub(Link, "findOne")
      .resolves(mocks.LinkBuilder.link().build());
    const link = await linkService.getLinkById(1);
    expect(link).to.deep.equal(mocks.LinkBuilder.link().build());
    expect(LinkMock.findOne.called).to.be.true;
    const params = LinkMock.findOne.getCall(0).args[0];
    expect(params).to.be.deep.equal({
      where: { id: 1 },
      include: [
        {
          model: db.HelperLink,
          as: "helper",
        },
      ],
    });
  });
  it("getLinkById - should throw an error if the link is not found", async () => {
    LinkMock.findOne = sinon.stub(Link, "findOne").rejects();
    try {
      await linkService.getLinkById(1);
    } catch (error) {
      expect(error).to.have.property("message", "Error retrieving link by ID");
      expect(error).to.be.instanceOf(Error);
    }
    expect(LinkMock.findOne.called).to.be.true;
    const params = LinkMock.findOne.getCall(0).args[0];
    expect(params).to.be.deep.equal({
      where: { id: 1 },
      include: [
        {
          model: db.HelperLink,
          as: "helper",
        },
      ],
    });
  });
});
