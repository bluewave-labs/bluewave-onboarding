const { describe, it, beforeEach, afterEach } = require("mocha");
const sinon = require("sinon");
const mocks = require("../../mocks/tour.mock.js");
const { expect } = require("chai");
const tourService = require("../../../service/tour.service.js");
const tourController = require("../../../controllers/tour.controller.js");

const tour = mocks.TourBuilder.tour;

describe("Test tour controller", () => {
  const serviceMock = {};
  const req = {};
  const res = {};
  describe("addTour", () => {
    beforeEach(() => {
      req.user = { id: "123" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 400 if title is not provided", async () => {
      req.body = tour().missingTitle().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "title, pageTargeting, theme, and triggeringFrequency are required",
          },
        ],
      });
    });
    it("should return 400 if pageTargeting is not provided", async () => {
      req.body = tour().missingPageTargeting().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "title, pageTargeting, theme, and triggeringFrequency are required",
          },
        ],
      });
    });
    it("should return 400 if theme is not provided", async () => {
      req.body = tour().missingTheme().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "title, pageTargeting, theme, and triggeringFrequency are required",
          },
        ],
      });
    });
    it("should return 400 if triggeringFrequency is not provided", async () => {
      req.body = tour().missingTriggeringFrequency().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "title, pageTargeting, theme, and triggeringFrequency are required",
          },
        ],
      });
    });
    it("should return 400 if pageTargeting is invalid", async () => {
      req.body = tour().invalidPageTargeting().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "Invalid value for pageTargeting, theme, or triggeringFrequency",
          },
        ],
      });
    });
    it("should return 400 if theme is invalid", async () => {
      req.body = tour().invalidTheme().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "Invalid value for pageTargeting, theme, or triggeringFrequency",
          },
        ],
      });
    });
    it("should return 400 if triggeringFrequency is invalid", async () => {
      req.body = tour().invalidTriggeringFrequency().build();
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(400);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        errors: [
          {
            msg: "Invalid value for pageTargeting, theme, or triggeringFrequency",
          },
        ],
      });
    });
    it("should return 201 if all required fields are provided", async () => {
      req.body = tour().build();
      serviceMock.createTour = sinon
        .stub(tourService, "createTour")
        .resolves(tour().build());
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(201);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal(tour().build());
    });
    it("should return 500 if an error occurs", async () => {
      req.body = tour().build();
      serviceMock.createTour = sinon
        .stub(tourService, "createTour")
        .rejects(new Error("error"));
      await tourController.addTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(500);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "CREATE_TOUR_ERROR",
        message: "error",
      });
    });
  });
  describe("deleteTour", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 404 if tour is not found", async () => {
      req.params = { id: "123" };
      serviceMock.deleteTour = sinon
        .stub(tourService, "deleteTour")
        .resolves(null);
      await tourController.deleteTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(404);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({ msg: "Tour not found" });
    });
    it("should return 200 if tour is found", async () => {
      req.params = { id: "123" };
      serviceMock.deleteTour = sinon
        .stub(tourService, "deleteTour")
        .resolves(tour().build());
      await tourController.deleteTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(200);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({ msg: "Tour deleted successfully" });
    });
    it("should return 500 if an error occurs", async () => {
      req.params = { id: "123" };
      serviceMock.deleteTour = sinon
        .stub(tourService, "deleteTour")
        .rejects(new Error("error"));
      await tourController.deleteTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(500);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "DELETE_TOUR_ERROR",
        message: "error",
      });
    });
  });
  describe("editTour", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 200 if all required fields are provided", async () => {
      req.body = tour().build();
      serviceMock.updateTour = sinon
        .stub(tourService, "updateTour")
        .resolves(tour().build());
      await tourController.editTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(200);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal(tour().build());
    });
    it("should return 404 if tour is not found", async () => {
      req.body = tour().build();
      serviceMock.updateTour = sinon
        .stub(tourService, "updateTour")
        .resolves(null);
      await tourController.editTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(404);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({ msg: "Tour not found" });
    });
    it("should return 500 if an error occurs", async () => {
      req.body = tour().build();
      serviceMock.updateTour = sinon
        .stub(tourService, "updateTour")
        .rejects(new Error("error"));
      await tourController.editTour(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(500);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "EDIT_TOUR_ERROR",
        message: "error",
      });
    });
  });
  describe("getAllTours", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 200 if tours are found", async () => {
      serviceMock.getAllTours = sinon
        .stub(tourService, "getAllTours")
        .resolves(mocks.toursList);
      await tourController.getAllTours(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(200);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal(mocks.toursList);
    });
    it("should return 500 if an error occurs", async () => {
      serviceMock.getAllTours = sinon
        .stub(tourService, "getAllTours")
        .rejects(new Error("error"));
      await tourController.getAllTours(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(500);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_TOURS_ERROR",
        message: "error",
      });
    });
  });
  describe("getTours", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 200 if tours are found", async () => {
      req.user = { id: "123" };
      serviceMock.getTours = sinon
        .stub(tourService, "getTours")
        .resolves(mocks.toursList);
      await tourController.getTours(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(200);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal(mocks.toursList);
    });
    it("should return 500 if an error occurs", async () => {
      req.user = { id: "123" };
      serviceMock.getTours = sinon
        .stub(tourService, "getTours")
        .rejects(new Error("error"));
      await tourController.getTours(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(500);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_USER_TOURS_ERROR",
        message: "error",
      });
    });
  });
  describe("getTourById", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it("should return 404 if tour is not found", async () => {
      req.params = { id: "123" };
      serviceMock.getTourById = sinon
        .stub(tourService, "getTourById")
        .resolves(null);
      await tourController.getTourById(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(404);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({ msg: "Tour not found" });
    });
    it("should return 200 if tour is found", async () => {
      req.params = { id: "123" };
      serviceMock.getTourById = sinon
        .stub(tourService, "getTourById")
        .resolves(tour().build());
      await tourController.getTourById(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(200);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal(tour().build());
    });
    it("should return 500 if an error occurs", async () => {
      req.params = { id: "123" };
      serviceMock.getTourById = sinon
        .stub(tourService, "getTourById")
        .rejects(new Error("error"));
      await tourController.getTourById(req, res);
      const status = res.status.getCall(0).args[0];
      expect(status).to.be.equal(500);
      const body = res.json.getCall(0).args[0];
      expect(body).to.be.deep.equal({
        error: "Internal Server Error",
        errorCode: "GET_TOUR_BY_ID_ERROR",
        message: "error",
      });
    });
  });
});
