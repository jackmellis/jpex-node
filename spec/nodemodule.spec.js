describe("node_module", function () {
  var Jpex, defaults, Class;
  beforeEach(function () {
    Jpex = require('jpex').extend();
    defaults = require('../src');
    Jpex.use(defaults);
  });
  it("should register a node module", function () {
    Jpex.register.node_module('jpex');
    expect(Jpex.$$factories.jpex).toBeDefined();
  });
  it("should use the node module to resolve dependencies", function (done) {
    Jpex.register.node_module('jpex');
    Class = Jpex.extend(function (jpex) {
      expect(jpex).toBeDefined();
      done();
    });
    Class();
  });
  it("should have a register option on sub classes", function () {
    Class = Jpex.extend();
    expect(typeof Class.register.node_module).toBe('function');
  });
});
