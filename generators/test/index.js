const Generator = require("yeoman-generator");
const extendPackage = require("../../src/extendPackage");
const defaultTSConfig = require("./templates/tsconfig");

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
    let depsAndScripts = depsAndScriptsFor(this.answers.testRunner, this.answers.testFiles);

    if (this.answers.testRunner === "jest") {
      this.fs.copy(
        this.templatePath("jest.config.js"),
        this.destinationPath("jest.config.js")
      );
    }

    this.fs.extendJSON(this.destinationPath("tsconfig.json"), defaultTSConfig(depsAndScripts.types));
    this.npmInstall(depsAndScripts.dependencies, { "save-dev": true });
    extendPackage({
      scripts: depsAndScripts.scripts
    }, this);
  }
};

function depsAndScriptsFor(testRunner, testFiles) {
  if (testRunner === "mocha") {
    return {
      dependencies: [
        "ts-node@^7.0.1",
        "mocha@^5.2.0",
        "@types/mocha@^5.2.5"
      ],
      types: "mocha",
      scripts: {
        "test": `mocha -r ts-node/register "${testFiles}"`,
        "test-watch": `mocha -r ts-node/register --watch --watch-extensions ts,tsx "${testFiles}"`
      }
    };
  } else {
    return {
      dependencies: [
        "jest@^23.6.0",
        "ts-jest@^23.10.5",
        "@types/jest@^23.3.10"
      ],
      types: "jest",
      scripts: {
        "test": "jest",
        "test-watch": "jest --watch",
        "coverage": "jest --coverage"
      }
    }
  }
}
