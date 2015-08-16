(function(exports) {
  "use strict";

  function compare_debian_package_versions(v1, v2){
    var GREATER = 1
    var LOWER = -1
    var EQUAL = 0
    var _v1 = v1.split(".")
    var _v2 = v2.split(".")

    for(var index=0; index< _v1.length; index++){
      var v1_number = parseInt(_v1[index])
      var v2_number = parseInt(_v2[index])
      if (v1_number > v2_number)
          return GREATER
      if (v1_number < v2_number)
          return LOWER
     }
    return EQUAL
  }

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

