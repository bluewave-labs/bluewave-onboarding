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
      title: `title ${id}`,
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
    this.tour.id = undefined;
    return this;
  }

  invalidTitle() {
    this.tour.title = null;
    return this;
  }

  missingTitle() {
    this.tour.title = undefined;
    return this;
  }

  invalidDescription() {
    this.tour.description = null;
    return this;
  }

  missingDescription() {
    this.tour.description = undefined;
    return this;
  }

  invalidPageTargeting() {
    this.tour.pageTargeting = "invalid";
    return this;
  }

  missingPageTargeting() {
    this.tour.pageTargeting = undefined;
    return this;
  }

  invalidTheme() {
    this.tour.theme = "invalid";
    return this;
  }

  missingTheme() {
    this.tour.theme = undefined;
    return this;
  }

  invalidTriggeringFrequency() {
    this.tour.triggeringFrequency = "invalid";
    return this;
  }

  missingTriggeringFrequency() {
    this.tour.triggeringFrequency = undefined;
    return this;
  }

  build() {
    return this.tour;
  }
}

const toursList = new Array(10)
  .fill(null)
  .map((_, i) => TourBuilder.tour(i + 1).build())
  .map((tour, i) => {
    if (i % 2 === 0) {
      return { ...tour, createdBy: 2 };
    }
    return tour;
  });

module.exports = { TourBuilder, toursList };
