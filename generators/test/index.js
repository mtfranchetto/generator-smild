const Generator = require("yeoman-generator");
const commonDeps = require("../../src/commonDeps");
const extendPackage = require("../../src/extendPackage");
const defaultJestConfig = require("./templates/jest.config");

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
        when: (answers) => answers.testRunner === "mocha",
        message: "Test to run",
        default: "test/**/*.ts",
        store: true
      }
    ]);
  }

  install() {
    let dependencies = commonDeps;
    let scripts = {};

    if (this.answers.testRunner === "mocha") {
      dependencies = dependencies.concat([
        "ts-node@^7.0.1",
        "mocha@^5.2.0"
      ]);
      scripts = {
        "test": `mocha -r ts-node/register --recursive ${this.answers.testFiles}`,
        "test-watch": `mocha -r ts-node/register --recursive --watch ${this.answers.testFiles}`
      }
    } else {
      dependencies = dependencies.concat([
        "jest@^23.6.0",
        "ts-jest@^23.10.5"
      ]);
      scripts = {
        "test": "jest",
        "test-watch": "jest --watch"
      }
      this.fs.extendJSON(this.destinationPath("jest.config.js"), defaultJestConfig);
    }

    this.npmInstall(dependencies, { "save-dev": true });
    extendPackage({
      scripts: scripts
    }, this);
  }
};
