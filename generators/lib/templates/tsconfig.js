module.exports = (files, out) => ({
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "declaration": true,
    "sourceMap": true,
    "outDir": out
  },
  "include": [
    files
  ]
});
