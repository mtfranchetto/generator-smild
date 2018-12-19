const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");
const fs = require("fs");

describe("Given a test generator", () => {

  let installSpy;

  describe("when configuring mocha", () => {

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/test"))
        .withPrompts({ testRunner: "mocha", testFiles: "test/dummySpec.ts" })
        .on("ready", generator => {
          installSpy = sinon.spy();
          generator.npmInstall = installSpy;
        });
    });

    it("should configure the right scripts", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          test: "mocha -r ts-node/register \"test/dummySpec.ts\"",
          "test-watch": "mocha -r ts-node/register --watch --watch-extensions ts,tsx \"test/dummySpec.ts\""
        }
      });
    });

    it("should install the required dependencies", () => {
      sinon.assert.calledWith(installSpy, [
        sinon.match(/ts-node@.+/),
        sinon.match(/mocha@.+/),
        sinon.match(/@types\/mocha@.+/),
      ], { "save-dev": true });
    });

    it("should not copy the jest config", () => {
      assert.noFile("jest.config.js");
    });

    it("should add mocha types to tsconfig", () => {
      assert.jsonFileContent("tsconfig.json", {
        "compilerOptions": {
          "types": ["mocha"]
        }
      });
    });
  });

  describe("when configuring jest", () => {

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/test"))
        .withPrompts({ testRunner: "jest" })
        .on("ready", generator => {
          installSpy = sinon.spy();
          generator.npmInstall = installSpy;
        });
    });

    it("should copy the jest config", () => {
      assert.fileContent(
        "jest.config.js",
        fs.readFileSync(path.join(__dirname, "../generators/test/templates/jest.config.js"), "utf8")
      );
    });

    it("should add jest types to tsconfig", () => {
      assert.jsonFileContent("tsconfig.json", {
        "compilerOptions": {
          "types": ["jest"]
        }
      });
    });

    it("should configure the right scripts", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          test: "jest",
          "test-watch": "jest --watch"
        }
      });
    });

    it("should add a command to run a test coverage", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          coverage: "jest --coverage"
        }
      });
    });

    it("should install the required dependencies", () => {
      sinon.assert.calledWith(installSpy, [
        sinon.match(/jest@.+/),
        sinon.match(/ts-jest@.+/),
        sinon.match(/@types\/jest@.+/)
      ], { "save-dev": true });
    });
  });
});
