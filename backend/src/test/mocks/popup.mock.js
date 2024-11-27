class PopupBuilder {
  constructor(id) {
    this.popup = {
      id,
      closeButtonAction: "open url",
      popupSize: "small",
      url: "/url",
      actionButtonText: "action",
      headerBackgroundColor: "#FFFFFF",
      headerColor: "#FFFFFF",
      textColor: "#FFFFFF",
      buttonBackgroundColor: "#FFFFFF",
      buttonTextColor: "#FFFFFF",
      header: "header",
      content: "content",
      createdBy: 1,
    };
  }

  static popup(id = 1) {
    return new PopupBuilder(id);
  }

  build() {
    return this.popup;
  }
}

const popupList = Array.from({ length: 10 }, (_, i) =>
  PopupBuilder.popup(i + 1).build()
).map((popup, i) => (i % 2 === 0 ? { ...popup, createdBy: 2 } : popup));

module.exports = {
  PopupBuilder,
  popupList,
};
