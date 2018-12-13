const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");

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
          test: "mocha -r ts-node/register --recursive test/dummySpec.ts",
          "test-watch": "mocha -r ts-node/register --recursive --watch test/dummySpec.ts"
        }
      });
    });

    it("should install the required dependencies", () => {
      sinon.assert.calledWith(installSpy, [
        sinon.match(/ts-node@.+/),
        sinon.match(/mocha@.+/),
      ], { "save-dev": true });
    });

    it("should not copy the jest config", () => {
      assert.noFile("jest.config.js");
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
      assert.jsonFileContent("jest.config.js", require("../generators/test/templates/jest.config"));
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
      ], { "save-dev": true });
    });
  });
});
