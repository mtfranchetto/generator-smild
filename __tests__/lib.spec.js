const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");

describe("Given a lib generator", () => {

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/lib"))
      .withPrompts({ main: "src/index.ts", out: "build" });
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
    assert.fileContent([
      ["package.json", /"typescript": ".+"/],
      ["package.json", /"tslint": ".+"/],
    ]);
  });
});
