const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const extendPackage = require("../../src/extendPackage");
const defaultTSConfig = require("./templates/tsconfig");
const defaultNodemonConfig = require("./templates/nodemon.json");
const chalk = require("chalk");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.SERVER));
  }

  config() {
    this.fs.copy(
      this.templatePath("enable-sourcemaps.js"),
      this.destinationPath("enable-sourcemaps.js")
    );
  }

  scripts() {
    extendPackage({
      scripts: {
        start: `nodemon ${this.answers.main}`,
        build: "tsc"
      }
    }, this);

    this.fs.extendJSON(
      this.destinationPath("tsconfig.json"),
      defaultTSConfig(this.answers.files, this.answers.out)
    );
    this.fs.extendJSON(this.destinationPath("nodemon.json"), defaultNodemonConfig);
  }

  install() {
    this.npmInstall([
      "nodemon@1.18.1",
      "ts-node@^7.0.1",
      "source-map-support@~0.5.9"
    ], { "save-dev": true });
  }

  infos() {
    console.log(chalk.inverse(`Please import ${chalk.green("enable-sourcemaps.js")}` +
      ` in your main file to add source maps support`))
  }
};
