describe("$fs", function () {
  var Jpex, defaults, $fs, fs, content;
  beforeEach(function () {
    Jpex = require('jpex').extend();
    defaults = require('../src');
    Jpex.use(defaults);

    Jpex.extend(function (_$fs_, _fs_) {
      $fs = _$fs_;
      fs = _fs_;
    })();

    content = fs.readFileSync('./spec/$fs.spec.js', 'utf8');
  });

  it("should inherit fs", function () {
    expect($fs.__proto__).toBe(fs);
  });
  it("should wrap async functions in promises", function (done) {
    $fs.readFile('./spec/$fs.spec.js', 'utf8')
      .then(function (data) {
        expect(data).toBe(content);
        done();
      });
  });
  it("should handle rejections", function (done) {
    $fs.readFile('./spec/doesnotexist.js', 'utf8')
      .catch(function (err) {
        expect(err).toBeDefined();
        expect(err instanceof Error).toBe(true);
        done();
      })
  });
  it("should include non-async functions", function () {
    var data = $fs.readFileSync('./spec/$fs.spec.js', 'utf8');
    expect(data).toBe(content);
  });
});
