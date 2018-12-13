const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const extendPackage = require("../../src/extendPackage");
const defaultTSConfig = require("./templates/tsconfig");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.LIB));
  }

  config() {
    this.fs.extendJSON(
      this.destinationPath("tsconfig.json"),
      defaultTSConfig(this.answers.files, this.answers.out)
    );

    extendPackage({
      scripts: {
        start: "tsc -w",
        build: `tsc`
      }
    }, this);
  }
};
