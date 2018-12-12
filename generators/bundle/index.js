const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const commonDeps = require("../../src/commonDeps");
const addDevDeps = require("../../src/addDevDeps");
const extendPackage = require("../../src/extendPackage");
const defaultTSConfig = require("./templates/tsconfig.json");
const defaultBabelConfig = require("./templates/babel.config");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.BUNDLE));
  }

  install() {
    addDevDeps({...commonDeps,
      "parcel-bundler": "^1.10.3",
      "parcel-plugin-static-files-copy": "^1.2.4",
      "@babel/core": "^7.2.0",
      "concurrently": "^4.1.0",
    }, this);
  }

  config() {
    extendPackage({
      scripts: {
        start: `concurrently "parcel ${this.answers.main} --out-dir ${this.answers.out}" "tsc --noEmit"`,
        build: `parcel build ${this.answers.main} --out-dir ${this.answers.out}`
      }
    }, this);

    if (this.answers.frontendFramework !== "react") {
      this.fs.copyTpl(
        this.templatePath("livereload.js"),
        this.destinationPath("livereload.js")
      );
    }

    if (this.answers.frontendFramework === 'react') {
      this.fs.extendJSON(this.destinationPath("babel.config.js"), defaultBabelConfig);
      addDevDeps({
        "react-hot-loader": "^4.5.2"
       }, this);
    }

    this.fs.extendJSON(this.destinationPath("tsconfig.json"), defaultTSConfig);
  }
};
