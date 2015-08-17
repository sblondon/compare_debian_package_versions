(function(exports) {
  "use strict";

  function compare_version_number(v1, v2){
    var GREATER = 1
    var LOWER = -1
    var EQUAL = 0
    for(var index=0; index< v1.length; index++){
      var v1_number = parseInt(v1[index])
      var v2_number = parseInt(v2[index])
      if (v1_number > v2_number)
          return GREATER
      if (v1_number < v2_number)
          return LOWER
     }
    return EQUAL
  }

  function compare_revision_number(v1, v2){
    var GREATER = 1
    var LOWER = -1
    var EQUAL = 0
    var v1_number = parseInt(v1)
    var v2_number = parseInt(v2)
    if (v1_number > v2_number)
        return GREATER
    if (v1_number < v2_number)
        return LOWER
    return EQUAL
  }


  function compare_debian_package_versions(v1, v2){
    var GREATER = 1
    var LOWER = -1
    var EQUAL = 0
    var _v1_version = v1.split("-")[0]
    var _v1_revision = v1.split("-")[1]
    var _v1 = _v1_version.split(".")
    var _v2_version = v2.split("-")[0]
    var _v2_revision = v2.split("-")[1]
    var _v2 = _v2_version.split(".")

    var version_number_comparision = compare_version_number(_v1, _v2)
    if (version_number_comparision == EQUAL)
        return compare_revision_number(_v1_revision, _v2_revision)
    else
        return version_number_comparision
  }

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

