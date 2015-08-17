(function(exports) {
  "use strict";
  var GREATER = 1
  var LOWER = -1
  var EQUAL = 0

  function Version(version_string){
    var version_numbers = version_string.split("-")[0].split(".")
    this.version_numbers = []
    
    for(var index=0; index < version_numbers.length; index++){
      this.version_numbers.push(parseInt(version_numbers[index]))
    }
    this.revision_number = parseInt(version_string.split("-")[1]) || 0
  }

  function compare_version_numbers(v1, v2){
    for(var index=0; index< v1.version_numbers.length; index++){
      var v1_number = v1.version_numbers[index]
      var v2_number = v2.version_numbers[index]
      if (v1_number > v2_number)
          return GREATER
      if (v1_number < v2_number)
          return LOWER
     }
    return EQUAL
  }

  function compare_revision_number(v1, v2){
    if (v1.revision_number > v2.revision_number)
        return GREATER
    if (v1.revision_number < v2.revision_number)
        return LOWER
    return EQUAL
  }


  function compare_debian_package_versions(v1, v2){
    var _v1 = new Version(v1)
    var _v2 = new Version(v2)

    var version_number_comparision = compare_version_numbers(_v1, _v2)
    if (version_number_comparision == EQUAL)
        return compare_revision_number(_v1, _v2)
    else
        return version_number_comparision
  }

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

