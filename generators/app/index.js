const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "projectType",
        message: "Choose how this project will run",
        choices: ["bundle", "lib", "server"],
        default: "bundle",
        store: true
      }
    ]);
  }

  runGenerators() {
    this.composeWith(require.resolve(`../${this.answers.projectType}`));
    this.composeWith(require.resolve("../test"));
  }

  install() {
    this.npmInstall(["yalc@1.0.0.pre.25"], { "save-dev": true });
  }
};
