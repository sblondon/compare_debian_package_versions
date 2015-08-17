(function(exports) {
  "use strict";
  var GREATER = 1
  var LOWER = -1
  var EQUAL = 0

  function Version(version_string){
    if(version_string.indexOf(":") !== -1)
        this.epoch_number = parseInt(version_string.split(":")[0])
    else
        this.epoch_number = 0

    if(this.epoch_number)
        var without_epoch_number = version_string.split(":")[1]
    else
        var without_epoch_number = version_string
    var version_numbers = without_epoch_number.split("-")[0].split(".")
    this.version_numbers = []
    
    for(var index=0; index < without_epoch_number.length; index++){
      this.version_numbers.push(parseInt(without_epoch_number[index]))
    }
    this.revision_number = parseInt(without_epoch_number.split("-")[1]) || 0
  }

  function compare_version_numbers(v1, v2){
    var MAX_LENGTH = Math.max(v1.version_numbers.length, v2.version_numbers.length)
    for(var index=0; index < MAX_LENGTH; index++){
      var v1_number = v1.version_numbers[index]
      var v2_number = v2.version_numbers[index]
      if (v2_number === undefined || v1_number > v2_number)
          return GREATER
      if (v1_number === undefined || v1_number < v2_number)
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

  function compare_epoch_number(v1, v2){
    if (v1.epoch_number > v2.epoch_number)
        return GREATER
    if (v1.epoch_number < v2.epoch_number)
        return LOWER
    return EQUAL
  }

  function compare_debian_package_versions(v1, v2){
    var _v1 = new Version(v1)
    var _v2 = new Version(v2)

    var epoch_number_comparision = compare_epoch_number(_v1, _v2)
    if (epoch_number_comparision != EQUAL)
        return epoch_number_comparision

    var version_number_comparision = compare_version_numbers(_v1, _v2)
    if (version_number_comparision == EQUAL)
        return compare_revision_number(_v1, _v2)
    else
        return version_number_comparision
  }

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

