const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");

describe("Given a test generator", () => {

  describe("when configuring mocha", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/test"))
        .withPrompts({ testRunner: "mocha", testFiles: "test/dummySpec.ts" });
    });

    it("should configure the right scripts", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          test: "mocha -r ts-node/register --recursive test/dummySpec.ts",
          "test-watch": "mocha -r ts-node/register --recursive --watch test/dummySpec.ts"
        }
      })
    });
  });

  describe("when configuring jest", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/test"))
        .withPrompts({ testRunner: "jest" });
    });
  });
});
