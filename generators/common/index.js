const Generator = require("yeoman-generator");
const extendPackage = require("../../src/extendPackage");

module.exports = class extends Generator {

  install() {
    this.npmInstall([
      "typescript@^3.2.2",
      "yalc@1.0.0-pre.24"
    ], { "save-dev": true });
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
