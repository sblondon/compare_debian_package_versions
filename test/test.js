compare = require("../src/compare.js")


var assert = require("assert");


describe('CompareVersionOfPackages', function() {
  describe('basic comparison', function () {
    var LOWER_VERSION = "2"
    var GREATER_VERSION = "3"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('epoch version', function () {
    var LOWER_VERSION = "3.3"
    var GREATER_VERSION = "2:1.O"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('comparison with 3 points in upstream number', function () {
    var LOWER_VERSION = "1.2.0"
    var GREATER_VERSION = "1.3.0"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('comparison with upstream number of different lengths', function () {
    var LOWER_VERSION = "1.2"
    var GREATER_VERSION = "1.2.1"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('comparison of upstream version appended by tidlaXXX', function () {
    var LOWER_VERSION = "1.2~dfsg"
    var GREATER_VERSION = "1.2~nmu"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });

  describe('comparison of upstream version appended by tidlaXXX and without tilaXXX appended', function () {
    var LOWER_VERSION = "1.2"
    var GREATER_VERSION = "1.2~nmu"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });



  describe('comparison with debian maintainer revision versions', function () {
    var LOWER_VERSION = "1.3.0-1"
    var GREATER_VERSION = "1.3.0-2"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('comparison with 3 points in revision number', function () {
    var LOWER_VERSION = "1-1.2.0"
    var GREATER_VERSION = "1-1.11.0"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('comparison of revision version appended by tidlaXXX', function () {
    var LOWER_VERSION = "1-1~deb1"
    var GREATER_VERSION = "1-1~deb2"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


  describe('comparison between an version with/without debian maintainer revision', function () {
    var LOWER_VERSION = "1.3.0"
    var GREATER_VERSION = "1.3.0-1"

    it("first parameter is greater than second one", function() {
      var result = compare.compare_debian_package_versions(
                GREATER_VERSION, LOWER_VERSION);
      assert.equal(1, result);
    });

    it("first parameter is lower than second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, GREATER_VERSION);
      assert.equal(-1, result);
    });

    it("first parameter is equal to second one", function() {
      var result = compare.compare_debian_package_versions(
                LOWER_VERSION, LOWER_VERSION);
      assert.equal(0, result);
    });
  });


});

