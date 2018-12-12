const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");

describe("Given the default generator", () => {

  let installSpy;

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({})
      .on("ready", generator => {
        installSpy = sinon.spy();
        generator.npmInstall = installSpy;
      });
  });

  it("should install yalc", () => {
    sinon.assert.calledWith(installSpy, [sinon.match(/yalc@.+/)], { "save-dev": true });
  });

  it("should configure yalc to handle package linking", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        "link": "yalc add",
        "rm-link": "yalc remove",
        "push": "yalc push"
      }
    });
  });
});
