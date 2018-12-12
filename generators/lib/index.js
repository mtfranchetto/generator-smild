const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const addDevDeps = require("../../src/addDevDeps");
const commonDeps = require("../../src/commonDeps");
const extendPackage = require("../../src/extendPackage");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.LIB));
  }

  install() {
    addDevDeps(commonDeps, this);
  }

  config() {
    extendPackage({
      scripts: {
        start: "tsc -w --noEmit",
        build: `tsc --outDir ${this.answers.out}`
      }
    }, this);
  }
};
