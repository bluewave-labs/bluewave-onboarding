class BannerBuilder {
  constructor() {
    this.banner = {
      id: 1,
      closeButtonAction: "no action",
      position: "top",
      url: "http://localhost:3000",
      fontColor: "#FFFFFF",
      backgroundColor: "#FFFFFF",
      bannerText: "banner 1",
      createdBy: 1,
    };
  }

  static banner() {
    return new BannerBuilder();
  }

  missingCloseButtonAction() {
    this.banner.closeButtonAction = "";
    return this;
  }
  missingPosition() {
    this.banner.position = "";
    return this;
  }
  missingUrl() {
    this.banner.url = "";
    return this;
  }
  missingFontColor() {
    this.banner.fontColor = "";
    return this;
  }
  missingBackgroundColor() {
    this.banner.backgroundColor = "";
    return this;
  }
  missingBannerText() {
    this.banner.bannerText = "";
    return this;
  }
  missingCreatedBy() {
    this.banner.createdBy = null;
    return this;
  }

  invalidCloseButtonAction() {
    this.banner.closeButtonAction = "close";
    return this;
  }
  invalidPosition() {
    this.banner.position = "side";
    return this;
  }
  invalidUrl() {
    this.banner.url = "url";
    return this;
  }
  invalidFontColor() {
    this.banner.fontColor = "blue";
    return this;
  }
  invalidBackgroundColor() {
    this.banner.backgroundColor = "black";
    return this;
  }
  invalidBannerText() {
    this.banner.bannerText = 12;
    return this;
  }
  invalidCreatedBy() {
    this.banner.createdBy = undefined;
    return this;
  }

  build() {
    return this.banner;
  }
}

const validList = [
  {
    id: 1,
    closeButtonAction: "no action",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 1",
    createdBy: 1,
  },
  {
    id: 2,
    closeButtonAction: "open url",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 2",
    createdBy: 1,
  },
  {
    id: 3,
    closeButtonAction: "open url in a new tab",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 3",
    createdBy: 1,
  },
  {
    id: 4,
    closeButtonAction: "no action",
    position: "bottom",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 4",
    createdBy: 1,
  },
  {
    id: 5,
    closeButtonAction: "open url",
    position: "bottom",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 5",
    createdBy: 1,
  },
  {
    id: 6,
    closeButtonAction: "open url in a new tab",
    position: "bottom",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 6",
    createdBy: 2,
  },
  {
    id: 7,
    closeButtonAction: "no action",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 7",
    createdBy: 2,
  },
  {
    id: 8,
    closeButtonAction: "no action",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 8",
    createdBy: 2,
  },
  {
    id: 9,
    closeButtonAction: "no action",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 9",
    createdBy: 2,
  },
  {
    id: 10,
    closeButtonAction: "no action",
    position: "top",
    url: "http://localhost:3000",
    fontColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    bannerText: "banner 10",
    createdBy: 2,
  },
];

module.exports = {
  BannerBuilder,
  validList,
};
