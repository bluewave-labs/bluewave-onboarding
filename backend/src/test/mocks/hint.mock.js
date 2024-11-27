class HintBuilder {
  constructor(id) {
    this.hint = {
      id,
      action: "open url in a new tab",
      actionButtonUrl: null,
      actionButtonText: null,
      targetElement: null,
      tooltipPlacement: "top",
      hintContent: "content",
      header: "header",
      headerBackgroundColor: "#FFFFFF",
      headerColor: "#000000",
      textColor: "#000000",
      buttonBackgroundColor: "#FFFFFF",
      buttonTextColor: "#000000",
      createdBy: 1,
    };
  }

  static hint(id) {
    return new HintBuilder(id);
  }

  build() {
    return this.hint;
  }
}

const hintList = Array.from({ length: 10 }, (_, i) =>
  new HintBuilder(i + 1).build()
).map((hint, i) => (i % 2 === 0 ? { ...hint, createdBy: 2 } : hint));

module.exports = {
  HintBuilder,
  hintList,
};
