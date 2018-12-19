module.exports = (data, context) => {
  context.fs.extendJSON(context.destinationPath("package.json"), data);
};
