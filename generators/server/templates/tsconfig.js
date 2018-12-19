module.exports = (files, out) => ({
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "sourceMap": true,
        "outDir": out
    },
    "include": [
      files
    ]
})
