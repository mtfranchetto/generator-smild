const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");

describe("Given the common generator", () => {

  let installSpy;

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/common"))
      .withPrompts({})
      .on("ready", generator => {
        installSpy = sinon.spy();
        generator.npmInstall = installSpy;
      });
  });

  it("should install the common dependencies", () => {
    sinon.assert.calledWith(installSpy, [
      sinon.match(/typescript@.+/),
      sinon.match(/yalc@.+/)
    ], { "save-dev": true });
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
