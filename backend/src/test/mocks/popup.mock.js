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

  missingCloseButtonAction() {
    delete this.popup.closeButtonAction;
    return this;
  }

  invalidCloseButtonAction() {
    this.popup.closeButtonAction = "invalid";
    return this;
  }

  missingPopupSize() {
    delete this.popup.popupSize;
    return this;
  }

  invalidPopupSize() {
    this.popup.popupSize = "invalid";
    return this;
  }

  invalidHeaderBackgroundColor() {
    this.popup.headerBackgroundColor = "invalid";
    return this;
  }

  invalidHeaderColor() {
    this.popup.headerColor = "invalid";
    return this;
  }

  invalidTextColor() {
    this.popup.textColor = "invalid";
    return this;
  }

  invalidButtonBackgroundColor() {
    this.popup.buttonBackgroundColor = "invalid";
    return this;
  }

  invalidButtonTextColor() {
    this.popup.buttonTextColor = "invalid";
    return this;
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
