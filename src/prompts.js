const ProjectTypes = require("./projectTypes");

module.exports = projectType => ([
  {
    name: "main",
    when: () => projectType !== ProjectTypes.LIB,
    message: "Project main file",
    default: projectType === ProjectTypes.BUNDLE ? "index.html" : "src/index.ts",
    store: true
  },
  {
    name: "port",
    when: () => projectType === ProjectTypes.BUNDLE,
    message: "Dev server port",
    default: 1234,
    store: true
  },
  {
    name: "files",
    when: () => projectType !== ProjectTypes.BUNDLE,
    message: "Project source files",
    default: "src/**/*",
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
]);
