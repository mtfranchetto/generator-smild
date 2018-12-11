const ProjectTypes = require("./projectTypes");

module.exports = (projectType) => [{
    type: "list",
    name: "packageManager",
    message: "Pick your favourite package manager",
    choices: ["npm", "yarn"],
    default: "npm"
}, {
    name: "main",
    message: "Your main script file",
    default: projectType === ProjectTypes.BUNDLE ? "index.html" : "src/index.ts"
}, {
    name: "frontendFramework",
    type: "list",
    message: "Frontend framework of your choice",
    default: "React",
    choices: ["React", "None"],
}, {
    type: "list",
    name: "testRunner",
    message: "Pick a test runner",
    choices: ["Mocha", "Jest"],
    default: "Mocha"
}];
