const ProjectTypes = require("./projectTypes");

module.exports = projectType => [
  {
    name: "main",
    message: "Your main script file",
    default:
      projectType === ProjectTypes.BUNDLE ? "index.html" : "src/index.ts",
    store: true
  },
  {
    name: "out",
    message: "Where to put built files",
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
