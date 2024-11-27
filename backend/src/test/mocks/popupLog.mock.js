class PopupLogBuilder {
  constructor() {
    this.popupLog = {
      popupType: 'guide',
      userId: 1,
      showingTime: new Date(),
      completed: false,
  }
  }

  static popupLog() {
    return new PopupLogBuilder();
  }

  build() {
    return this.popupLog;
  }
}

const popupLogList = Array.from({ length: 5 }, (_, i) => PopupLogBuilder.popupLog().build());

module.exports = {
  PopupLogBuilder,
  popupLogList
};