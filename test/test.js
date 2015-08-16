compare = require("../src/compare.js")


var assert = require("assert");




describe('CompareVersionOfPackages', function() {
  describe('compare', function () {

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions("3", "2");
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions("2", "3");
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions("2", "2");
      assert.equal(0, result);
    });




  });
});

