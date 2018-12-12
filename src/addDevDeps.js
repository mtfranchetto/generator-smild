const extendPackage = require("./extendPackage");

module.exports = (deps, context) => {
  extendPackage({
    devDependencies: deps
  }, context);

  context.npmInstall();
}
