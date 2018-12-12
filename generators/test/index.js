const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "testRunner",
        message: "Pick a test runner",
        choices: ["mocha", "jest"],
        default: "mocha",
        store: true
      },
      {
        name: "testFiles",
        message: "Test to run",
        default: "test/**/*.ts",
        store: true
      }
    ]);
  }

  install() {
    let dependencies = commonDeps;

    if (this.answers.testRunner === "mocha") {
      dependencies = commonDeps.concat([
        "ts-node@^7.0.1",
        "mocha@^5.2.0"
      ]);
    }

    this.npmInstall(dependencies, { "save-dev": true });
  }
};
