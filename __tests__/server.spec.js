const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");

describe("Given a server generator", () => {

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/server"))
        .withPrompts({  main: "src/index.ts", out: "dist" });
    });

    it("should include the right nodemon configuration", () => {
        assert.fileContent("nodemon.json", fs.readFileSync(path.join(__dirname, "../generators/server/templates/nodemon.json")));
    });

    it("should configure watch and build scripts", () => {
      assert.jsonFileContent("package.json", {
        scripts: {
          start: "nodemon src/index.ts",
          build: "tsc --out-dir dist"
        }
      })
    });

    it("should include the source maps enable script", () => {
      assert.fileContent("enable-sourcemaps.js", fs.readFileSync(path.join(__dirname, "../generators/server/templates/enable-sourcemaps.js")));
    });
});
