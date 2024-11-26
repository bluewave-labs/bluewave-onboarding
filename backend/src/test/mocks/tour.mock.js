class TourBuilder {
  triggeringFrequency = [
    "just once",
    "once in every session",
    "once every day",
    "once every week",
    "once every month",
    "always",
  ];
  pageTargeting = ["equals to", "is different from"];
  constructor(id) {
    this.tour = {
      id: id,
      title: "title",
      description: "description",
      statusActive: true,
      pageTargeting: this.pageTargeting[0],
      theme: "default theme",
      triggeringFrequency: this.triggeringFrequency[0],
      createdBy: 1,
    };
  }

  static tour(id = 1) {
    return new TourBuilder(id);
  }

  withoutId() {
    delete this.tour.id;
    return this;
  }

  invalidTitle() {
    this.tour.title = null;
    return this;
  }

  missingTitle() {
    delete this.tour.title;
    return this;
  }

  invalidDescription() {
    this.tour.description = null;
    return this;
  }

  missingDescription() {
    delete this.tour.description;
    return this;
  }

  invalidPageTargeting() {
    this.tour.pageTargeting = "invalid";
    return this;
  }

  missingPageTargeting() {
    delete this.tour.pageTargeting;
    return this;
  }

  invalidTheme() {
    this.tour.theme = "invalid";
    return this;
  }

  missingTheme() {
    delete this.tour.theme;
    return this;
  }

  invalidTriggeringFrequency() {
    this.tour.triggeringFrequency = "invalid";
    return this;
  }

  missingTriggeringFrequency() {
    delete this.tour.triggeringFrequency;
    return this;
  }

  build() {
    return this.tour;
  }
}

const toursList = new Array(5)
  .fill(null)
  .map((_, i) => TourBuilder.tour(i + 1).build());

module.exports = { TourBuilder, toursList };
