compare = require("../src/compare.js")


var assert = require("assert");




describe('CompareVersionOfPackages', function() {
  describe('basic comparison', function () {
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

  describe('comparison with 3 points in version number', function () {
    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions("1.3.0", "1.2.0");
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions("1.2.1", "1.3.1");
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions("1.2.3", "1.2.3");
      assert.equal(0, result);
    });
  });


});

