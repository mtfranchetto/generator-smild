const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");
const sinon = require("sinon");

describe("Given a bundle generator", () => {

  let installSpy;

  describe("when react as a framework is selected", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ frontendFramework: "react" })
        .on("ready", generator => {
          installSpy = sinon.spy();
          generator.npmInstall = installSpy;
        });
    });

    it("should install react hot loader", () => {
      sinon.assert.calledWith(installSpy, [
        sinon.match(/react-hot-loader@.+/)
      ], { "save-dev": true });
    });

    it("should add the babel configuration", () => {
      assert.fileContent(
        "babel.config.js",
        fs.readFileSync(path.join(__dirname, "../generators/bundle/templates/babel.config.js"), "utf8")
      );
    });

    it("should not copy the livereload script", () => {
      assert.noFile("livereload.js");
    });
  });

  describe("when no framework is selected", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ frontendFramework: "none" })
        .on("ready", generator => {
          installSpy = sinon.spy();
          generator.npmInstall = installSpy;
        });
    });

    it("should add a livereload script to include", () => {
      assert.fileContent("livereload.js", fs.readFileSync(path.join(__dirname, "../generators/bundle/templates/livereload.js"), "utf8"));
    });

    it("should not copy tha babel configuration", () => {
      assert.noFile("babel.config.js");
    });
  });

  describe("when the standard config is provided", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/bundle"))
        .withPrompts({ main: "index_test.html", out: "build", port: 1234 })
        .on("ready", generator => {
          installSpy = sinon.spy();
          generator.npmInstall = installSpy;
        });
    });

    it("should add the correct tsconfig", () => {
      assert.jsonFileContent("tsconfig.json", {
        "compilerOptions": {
          "allowSyntheticDefaultImports": true,
          "esModuleInterop": true,
          "sourceMap": true,
          "module": "esnext",
          "moduleResolution": "node"
        }
      });
    });

    it("should exclude some folders to avoid redundant typescript watches", () => {
      assert.jsonFileContent("tsconfig.json", {
        exclude: [
          "build/**/*",
          ".cache/**/*"
        ]
      });
    });

    it("should the correct build scripts to package.json", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          start: "concurrently \"parcel index_test.html --out-dir build -p 1234\" \"tsc -w --noEmit\"",
          build: "tsc --noEmit && parcel build index_test.html --out-dir build"
        }
      });
    });

    it("should install the required dependencies", () => {
      sinon.assert.calledWith(installSpy, [
        sinon.match(/parcel-bundler@.+/),
        sinon.match(/parcel-plugin-static-files-copy@.+/),
        sinon.match(/@babel\/core@.+/),
        sinon.match(/concurrently@.+/)
      ], { "save-dev": true });
    });
  });
});
