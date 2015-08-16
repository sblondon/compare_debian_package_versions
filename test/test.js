compare = require("../src/compare.js")


var assert = require("assert");




describe('CompareVersionOfPackages', function() {
  describe('compare', function () {

    it("always returns 1", function() {
      var result = compare.compare_debian_package_versions("2", "3");
      assert.equal(1, result);
    });


  });
});

