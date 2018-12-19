const path = require("path");

module.exports = (out) => ({
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "sourceMap": true,
        "module": "esnext",
        "moduleResolution": "node"
    },
    "exclude": [
      path.join(out, "**/*"),
      path.join(".cache", "**/*")
    ]
});
