(function(exports) {
  "use strict";
  var GREATER = 1
  var LOWER = -1
  var EQUAL = 0

  function Version(raw_version){
    if(raw_version.indexOf(":") !== -1){
        this.epoch_number = parseInt(raw_version.split(":")[0])
        var without_epoch_number = raw_version.split(":")[1]
    }
    else{
        this.epoch_number = 0
        var without_epoch_number = raw_version
    }

    var upstream_numbers = without_epoch_number.split("-")[0].split(".")
    this.upstream_numbers = []
    for(var index=0; index < upstream_numbers.length; index++){
      this.upstream_numbers.push(parseInt(upstream_numbers[index]))
    }

    if(without_epoch_number.indexOf("-") !== -1){
      var revision_numbers = without_epoch_number.split("-")[1].split(".")
      this.revision_numbers = []
      for(var index=0; index < revision_numbers.length; index++){
        this.revision_numbers.push(parseInt(revision_numbers[index]))
      }
    }else{
          this.revision_numbers = []
    }
  }

  function compare_integer_lists(l1, l2){
    var MAX_LENGTH = Math.max(l1.length, l2.length)
    for(var index=0; index < MAX_LENGTH; index++){
      var number_1 = l1[index]
      var number_2 = l2[index]
      if (number_2 === undefined)
          return GREATER
      if (number_1 === undefined)
          return LOWER

      var result = compare_integer(number_1, number_2)
      if(result !== EQUAL)
          return result
     }
    return EQUAL
  }

  function compare_upstream_version_numbers(v1, v2){
    return compare_integer_lists(v1.upstream_numbers, v2.upstream_numbers)
  }

  function compare_revision_numbers(v1, v2){
    return compare_integer_lists(v1.revision_numbers, v2.revision_numbers)
  }

  function compare_epoch_number(v1, v2){
    return compare_integer(v1.epoch_number, v2.epoch_number)
  }

  function compare_integer(i1, i2){
    if (i1 > i2)
        return GREATER
    if (i1 < i2)
        return LOWER
    return EQUAL
  }

  function compare_debian_package_versions(v1, v2){
    var _v1 = new Version(v1)
    var _v2 = new Version(v2)

    var epoch_number_comparision = compare_epoch_number(_v1, _v2)
    if (epoch_number_comparision != EQUAL)
        return epoch_number_comparision

    var upstream_number_comparision = compare_upstream_version_numbers(_v1, _v2)
    if (upstream_number_comparision == EQUAL){
        return compare_revision_numbers(_v1, _v2)
    }
    else
        return upstream_number_comparision
  }

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

