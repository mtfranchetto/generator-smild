const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");

describe("Given the default generator", () => {

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ });
  });

  it("should configure yalc to handle package linking", () => {
    assert.jsonFileContent("package.json", {
      "add-local": "yalc add",
      "remove-local": "yalc remove",
      "push-local": "yalc push"
    });
  });
});
