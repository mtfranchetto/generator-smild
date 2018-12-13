const Generator = require("yeoman-generator");
const extendPackage = require("../../src/extendPackage");

module.exports = class extends Generator {

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
};
