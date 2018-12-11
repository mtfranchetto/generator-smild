const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const commonDeps = require("../../src/commonDeps");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.BUNDLE));
  }

  install() {
    let dependencies = commonDeps.concat([
      "parcel-bundler@^1.10.3",
      "parcel-plugin-static-files-copy@^1.2.4",
      "@babel/core@^7.2.0"
    ]);

    this.npmInstall(dependencies, { "save-dev": true });
  }
};
