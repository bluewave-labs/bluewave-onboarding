class PopupLogBuilder {
  constructor() {
    this.popupLog = {
      popupType: "guide",
      userId: "1",
      showingTime: new Date(),
      completed: false,
    };
  }

  static popupLog() {
    return new PopupLogBuilder();
  }

  invalidPopupType() {
    this.popupLog.popupType = "invalid";
    return this;
  }

  missingPopupType() {
    delete this.popupLog.popupType;
    return this;
  }

  invalidUserId() {
    this.popupLog.userId = 123;
    return this;
  }

  missingUserId() {
    delete this.popupLog.userId;
    return this;
  }

  invalidCompleted() {
    this.popupLog.completed = "invalid";
    return this;
  }

  missingCompleted() {
    delete this.popupLog.completed;
    return this;
  }

  build() {
    return this.popupLog;
  }
}

const popupLogList = Array.from({ length: 5 }, (_, i) =>
  PopupLogBuilder.popupLog().build()
);

module.exports = {
  PopupLogBuilder,
  popupLogList,
};
