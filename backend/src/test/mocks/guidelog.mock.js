class GuideLogBuilder {
  constructor(id) {
    this.guideLog = {
      guideType: 3,
      guideId: id,
      userId: '1',
      showingTime: new Date("2024-11-29T00:00:00.000Z"),
      completed: false,
    };
  }

  static guideLog(id = 1) {
    return new GuideLogBuilder(id);
  }

  invalidGuideType() {
    this.guideLog.guideType = "invalid";
    return this;
  }

  missingGuideType() {
    this.guideLog.guideType = undefined;
    return this;
  }

  invalidUserId() {
    this.popupLog.userId = 123;
    return this;
  }

  missingUserId() {
    this.popupLog.userId = undefined;
    return this;
  }

  invalidCompleted() {
    this.popupLog.completed = "invalid";
    return this;
  }

  build() {
    return this.guideLog;
  }
}

const guideLogList = Array.from({ length: 10 }, (_, i) => {
  return GuideLogBuilder.guideLog(i + 1).build();
}).map((guideLog, i) => (i % 2 === 0 ? guideLog : { ...guideLog, userId: 2 }));

module.exports = { GuideLogBuilder, guideLogList };
