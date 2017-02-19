describe("$tick", function () {
  var Jpex, defaults, $tick;
  beforeEach(function () {
    Jpex = require('jpex');
    defaults = require('../src');
    Jpex.use(defaults);
    Jpex.extend(function (_$tick_) {
      $tick = _$tick_;
    })();
  });
  it("should call back on the next tick", function (done) {
    $tick(done);
  });
});
