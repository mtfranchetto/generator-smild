const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");

describe("Given a bundle generator", () => {

  describe("when react as a framework is selected", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ frontendFramework: "react" });
    });

    it("should install react hot loader", () => {
      assert.fileContent("package.json", /"react-hot-loader": ".?"/);
    });

    it("should add the babel configuration", () => {
      assert.jsonFileContent(".babelrc", { plugins: ["react-hot-loader/babel"] });
    });
  });

  describe("when no framework is selected", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ frontendFramework: "none" });
    });

    it("should add a livereload script to include", () => {
      assert.fileContent("livereload.js", fs.readFileSync(path.join(__dirname, "../generators/bundle/template/livereload.js")));
    });
  });

  describe("when the standard config is provided", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ });
    });

    it("should add the correct tsconfig", () => {
      assert.jsonFileContent("tsconfig.json", {
        "compilerOptions": {
          "allowSyntheticDefaultImports": true,
          "esModuleInterop": true,
          "sourceMap": true,
          "module": "esnext"
        }
      });
    });

    it("should the correct build scripts to package.json", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          start: "concurrently \"parcel index_test.html --out-dir build\" \"tsc --noEmit\"",
          build: "parcel build index_test.html --out-dir build"
        }
      });
    });

    it("should install the required dependencies", () => {
      assert.fileContent([
        ["package.json", /"parcel-bundler": ".?"/],
        ["package.json", /"parcel-plugin-static-files-copy": ".?"/],
        ["package.json", /"@babel\/core": ".?"/],
        ["package.json", /"concurrently": ".?"/],
        ["package.json", /"typescript": ".?"/],
        ["package.json", /"tslint": ".?"/],
      ]);
    });
  });
});
