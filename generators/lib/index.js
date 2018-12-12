const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const addDevDeps = require("../../src/addDevDeps");
const commonDeps = require("../../src/commonDeps");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.LIB));
  }

  install() {
    addDevDeps(commonDeps, this);
  }
};
