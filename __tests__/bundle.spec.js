const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");

describe("Given a bundle generator", () => {

  describe("when React as a framework is selected", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ frontendFramework: "React" });
    });

    it("should add the babel configuration", () => {
      assert.jsonFileContent(".babelrc", { plugins: ["react-hot-loader/babel"] });
    });
  });

  describe("when no framework is selected", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ frontendFramework: "None" });
    });


    it("should add a livereload script to include", () => {
      assert.fileContent("livereload.js", fs.readFileSync(path.join(__dirname, "../generators/bundle/template/livereload.js")));
    });
  });

  it("should add the correct tsconfig", async () => {
    await helpers
      .run(path.join(__dirname, "../generators/bundle"))
      .withPrompts({});

    assert.jsonFileContent("tsconfig.json", {
      "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "sourceMap": true,
        "module": "esnext"
      }
    });
  });

  it("should the correct build scripts to package.json", async () => {
    await helpers
      .run(path.join(__dirname, "../generators/bundle"))
      .withPrompts({ main: "index_test.html", out: "build" });

    assert.jsonFileContent("package.json", {
      scripts: {
        start: "concurrently \"parcel index_test.html --out-dir build\" \"tsc --noEmit\"",
        build: "parcel build index_test.html --out-dir build"
      }
    });
  });
});
