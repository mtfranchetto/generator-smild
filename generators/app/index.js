const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "projectType",
        message: "Choose how this project will be built",
        choices: ["bundle", "lib", "server"],
        default: "bundle",
        store: true
      }
    ]);
  }

  runGenerators() {
    this.composeWith(require.resolve("../common"));
    this.composeWith(require.resolve(`../${this.answers.projectType}`));
    this.composeWith(require.resolve("../test"));
  }
};
