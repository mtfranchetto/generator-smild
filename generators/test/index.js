const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "testRunner",
        message: "Pick a test runner",
        choices: ["Mocha", "Jest"],
        default: "Mocha",
        store: true
      }
    ]);
  }

  initialize() {}
};
