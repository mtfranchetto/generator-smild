const Generator = require("yeoman-generator");

module.exports = class extends Generator {

  async prompting() {
    this.answers = await this.prompt([{
      type: "list",
      name: "projectType",
      message: "Choose how this project will run",
      choices: ["bundle", "lib", "server"],
      default: "bundle",
      store: true
    }]);
  }

  initialize() {
    this.composeWith(require.resolve(`../${this.answers.projectType}`));
  }
};
