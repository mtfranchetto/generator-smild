const ProjectTypes = require("./projectTypes");

module.exports = (projectType) => [{
    type: "list",
    name: "packageManager",
    message: "Pick your favourite package manager",
    choices: ["npm", "yarn"],
    default: "npm",
    store: true
}, {
    name: "main",
    message: "Your main script file",
    default: projectType === ProjectTypes.BUNDLE ? "index.html" : "src/index.ts",
    store: true
}, {
    name: "frontendFramework",
    type: "list",
    message: "Frontend framework of your choice",
    default: "React",
    choices: ["React", "None"],
    store: true
}, {
    type: "list",
    name: "testRunner",
    message: "Pick a test runner",
    choices: ["Mocha", "Jest"],
    default: "Mocha",
    store: true
}];
