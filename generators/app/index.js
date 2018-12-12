const Generator = require("yeoman-generator");
const addDevDeps = require("../../src/addDevDeps");
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
    addDevDeps({
      yalc: "1.0.0.pre.25"
    }, this);
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
