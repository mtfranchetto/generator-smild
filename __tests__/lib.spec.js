const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");

describe("Given a lib generator", () => {

  let installSpy;

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/lib"))
      .withPrompts({ main: "src/**/*", out: "build" })
      .on("ready", generator => {
        installSpy = sinon.spy();
        generator.npmInstall = installSpy;
      });
  });

  it("should create the build scripts correctly", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        start: "tsc -w",
        build: "tsc"
      }
    });
  });

  it("should config typescript for the right sources", () => {
    assert.jsonFileContent("tsconfig.json", {
      "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "declaration": true,
        "sourceMap": true,
        "outDir": "build"
      },
      "include": [
        "src/**/*"
      ]
    });
  });
});
