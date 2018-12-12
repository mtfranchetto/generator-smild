const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const commonDeps = require("../../src/commonDeps");
const extendPackage = require("../../src/extendPackage");
const defaultTSConfig = require("./templates/tsconfig.json");
const defaultNodemonConfig = require("./templates/nodemon.json");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.SERVER));
  }

  config() {
    this.fs.copyTpl(
      this.templatePath("enable-sourcemaps.js"),
      this.destinationPath("enable-sourcemaps.js")
    );
  }

  scripts() {
    extendPackage({
      scripts: {
        start: `nodemon ${this.answers.main}`,
        build: `tsc --outDir ${this.answers.out}`
      }
    }, this);

    this.fs.extendJSON(this.destinationPath("tsconfig.json"), defaultTSConfig);
    this.fs.extendJSON(this.destinationPath("nodemon.json"), defaultNodemonConfig);
  }

  install() {
    this.npmInstall(commonDeps.concat([
      "nodemon@1.18.1",
      "ts-node@^7.0.1",
      "source-map-support@~0.5.9"
    ]), { "save-dev": true });
  }
};
