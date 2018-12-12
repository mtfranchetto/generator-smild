const Generator = require("yeoman-generator");
const addDevDeps = require("../../src/addDevDeps");
const commonDeps = require("../../src/commonDeps");

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
      dependencies = {...dependencies,
        "ts-node": "^7.0.1",
        "mocha": "^5.2.0"
      };
    } else {
      dependencies = { ... dependencies,
        "jest": "^23.6.0",
        "ts-jest": "^23.10.5"
      };
    }

    addDevDeps(dependencies, this);
  }
};
