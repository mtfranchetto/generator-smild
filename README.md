# generator-smild [![NPM version][npm-image]][npm-url]
> An opinionated generator to build JavaScript projects

Transitioning from code to running code is not always easy in JavaScript. Over the years this process has become simpler thanks to projects like browserify, Webpack and ParcelJS but still some configuration caveats must be addressed to have a fully functioning solution. This project aims to give you a simpler way to configure your application in an opinionated way that can be tested and built with a single command.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-smild using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-smild
```

Then generate your project:

```bash
yo smild
```

A guided setup is shown where three different paths are available.

## Bundle setup

Mainly for frontend applications, this setup runs [ParcelJS](https://parceljs.org) with the proper Typescript config to package source files and assets of your app that can be distributed to your users.

### Features
- Typescript support built-in
- All ParcelJS features: HMR, bundle splitting, source maps, etc
- React-hot-loader support
- Parcel static plugin: simply place all of your static assets under a _static_ directory and it will be copied to the build folder

### Commands

```bash
npm start
```
This starts Parcel in watch mode and spawns a dev server (default port 1234) to access your frontend.

```bash
npm run build
```
Used to build your app in production mode with minify turned on and files revisioning enabled.

## Server setup

Use this setup for running a NodeJS server app.

### Features

- Typescript built-in support
- Live reload using [Nodemon](https://nodemon.io)
- Source maps support

### Commands

```bash
npm start
```
Your main file is ran with live reload enabled.

```bash
npm run build
```
Source files are transpiled with _tsc_ and put in the build folder.

## Lib setup

This setup transpiles your Typescript codebase making it available for publishing on NPM.

### Commands

```bash
npm start
```
Launches Typescript compiler in watch mode.

```bash
npm run build
```
The same as the command above without watch.

## Common configuration

Regardless of the project type some additional useful commands will be configured for testing and linking local packages. There are two test runners available: [jest](https://jestjs.io) or [mocha](http://mochajs.org).

```bash
npm test
```
Executes the matching unit test using the selected test runner.

```bash
npm run test-watch
```
The same as the command above but using watch mode to re run the test on file changes.

```bash
npm run coverage
```
Executes the matching unit test producing a coverage report.

```bash
npm run link [package-name]
```
Alias for _yalc add [package-name]_.

```bash
npm run rm-link [package-name]
```
Alias for _yalc remove [package-name]_.

```bash
npm run push
```
Alias for _yalc push_.

For a detailed explanation of yalc usage please visit the [project homepage](https://github.com/whitecolor/yalc).

## Common questions
### After a build configuration has been created, how I can change some parameters without a manual intervention?

Just re run the generator! You will be prompted with the old inputs given, change the one you need.

## License

MIT © [Mattia Franchetto](https://medium.com/@mtfranchetto)


[npm-image]: https://badge.fury.io/js/generator-smild.svg
[npm-url]: https://npmjs.org/package/generator-smild
