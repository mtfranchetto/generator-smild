const ProjectTypes = require("./projectTypes");
const mainFiles = {};
mainFiles[ProjectTypes.LIB] = "src/**/*";
mainFiles[ProjectTypes.BUNDLE] = "index.html";
mainFiles[ProjectTypes.SERVER] = "src/index.ts";

module.exports = projectType => {
  return [
    {
      name: "main",
      message: projectType !== ProjectTypes.LIB ? "Project main file" : "Project source files",
      default: mainFiles[projectType],
      store: true
    },
    {
      name: "out",
      message: "Where to put build files",
      default: "dist",
      store: true
    },
    {
      name: "frontendFramework",
      when: () => projectType === ProjectTypes.BUNDLE,
      type: "list",
      message: "Frontend framework for this project",
      default: "react",
      choices: ["react", "none"],
      store: true
    }
  ];
}
