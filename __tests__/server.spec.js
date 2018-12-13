const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs");
const sinon = require("sinon");

describe("Given a server generator", () => {

  let installSpy;

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/server"))
      .withPrompts({ files: "src/**/*.ts", main: "src/index.ts", out: "dist" })
      .on("ready", generator => {
        installSpy = sinon.spy();
        generator.npmInstall = installSpy;
      });
  });

  it("should include the right nodemon configuration", () => {
    assert.jsonFileContent("nodemon.json", require("../generators/server/templates/nodemon.json"));
  });

  it("should configure watch and build scripts", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        start: "nodemon src/index.ts",
        build: "tsc"
      }
    })
  });

  it("should add the correct tsconfig", () => {
    assert.jsonFileContent("tsconfig.json", {
      "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "sourceMap": true,
        "outDir": "dist"
      },
      "include": [
        "src/**/*.ts"
      ]
    });
  });

  it("should include the source maps enable script", () => {
    assert.fileContent("enable-sourcemaps.js", fs.readFileSync(path.join(__dirname, "../generators/server/templates/enable-sourcemaps.js"), "utf8"));
  });

  it("should install the required dependencies", () => {
    sinon.assert.calledWith(installSpy, [
      sinon.match(/nodemon@.+/),
      sinon.match(/ts-node@.+/),
      sinon.match(/source-map-support@.+/),
    ], { "save-dev": true });
  });
});
