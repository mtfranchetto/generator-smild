const Generator = require("yeoman-generator");
const extendPackage = require("../../src/extendPackage");

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

  install() {
    this.npmInstall(["yalc@1.0.0-pre.24"], { "save-dev": true });
  }

  config() {
    extendPackage({
      scripts: {
        "link": "yalc add",
        "rm-link": "yalc remove",
        "push": "yalc push"
      }
    }, this);
  }

  runGenerators() {
    this.composeWith(require.resolve(`../${this.answers.projectType}`));
    this.composeWith(require.resolve("../test"));
  }
};
