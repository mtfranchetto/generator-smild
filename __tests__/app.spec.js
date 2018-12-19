const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const sinon = require("sinon");
const projectTypes = require("../src/projectTypes");

describe("Given the default generator", () => {

  let composeSpy;

  describe("when generating a bundle project", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/app"))
        .withPrompts({ projectType: projectTypes.BUNDLE})
        .on("ready", generator => {
          composeSpy = sinon.spy();
          generator.composeWith = composeSpy;
        });
    });
    it("should call the right generators", () => {
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/common"));
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/bundle"));
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/test"));
    });
  });

  describe("when generating a lib project", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/app"))
        .withPrompts({ projectType: projectTypes.LIB})
        .on("ready", generator => {
          composeSpy = sinon.spy();
          generator.composeWith = composeSpy;
        });
    });
    it("should call the right generators", () => {
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/common"));
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/lib"));
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/test"));
    });
  });

  describe("when generating a server project", () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, "../generators/app"))
        .withPrompts({ projectType: projectTypes.SERVER})
        .on("ready", generator => {
          composeSpy = sinon.spy();
          generator.composeWith = composeSpy;
        });
    });
    it("should call the right generators", () => {
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/common"));
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/server"));
      sinon.assert.calledWith(composeSpy, require.resolve("../generators/test"));
    });
  });
});
