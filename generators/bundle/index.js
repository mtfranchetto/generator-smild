const Generator = require("yeoman-generator");
const promptsFor = require("../../src/prompts");
const ProjectTypes = require("../../src/projectTypes");
const extendPackage = require("../../src/extendPackage");
const defaultTSConfig = require("./templates/tsconfig.json");
const defaultBabelConfig = require("./templates/babel.config");
const chalk = require("chalk");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(promptsFor(ProjectTypes.BUNDLE));
  }

  install() {
    this.npmInstall([
      "parcel-bundler@^1.10.3",
      "parcel-plugin-static-files-copy@^1.2.4",
      "@babel/core@^7.2.0",
      "concurrently@^4.1.0",
    ], { "save-dev": true });
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
      this.npmInstall(["react-hot-loader@^4.5.2"], { "save-dev": true });
    }

    this.fs.extendJSON(this.destinationPath("tsconfig.json"), defaultTSConfig);
  }

  infos() {
    if (this.answers.frontendFramework !== "react") {
      console.log(chalk.inverse(`Please require ${chalk.green("livereload.js")}`+
        ` in your main file to reload the browser on files changes`));
    }
  }
};
