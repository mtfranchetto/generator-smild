const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const commonDeps = require("../../src/commonDeps");
const addDevDeps = require("../../src/addDevDeps");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.SERVER));
  }

  install() {
    addDevDeps({...commonDeps,
      "nodemon": "^1.18.1",
      "ts-node": "^7.0.1",
      "source-map-support": "~0.5.9"
    }, this);
  }
};
