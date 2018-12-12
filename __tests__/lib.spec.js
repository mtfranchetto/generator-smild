const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");

describe("Given a lib generator", () => {

  let installSpy;

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/lib"))
      .withPrompts({ main: "src/index.ts", out: "build" })
      .on("ready", generator => {
        installSpy = sinon.spy();
        generator.npmInstall = installSpy;
      });
  });

  it("should create the build scripts correctly", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        start: "tsc -w --noEmit",
        build: "tsc --outDir build"
      }
    });
  });

  it("should install the required dependencies", () => {
    sinon.assert.calledWith(installSpy, [
      sinon.match(/typescript@.+/),
      sinon.match(/tslint@.+/)
    ], { "save-dev": true });
  });
});
