(function(exports) {
  "use strict";
  var GREATER = 1
  var LOWER = -1
  var EQUAL = 0


  function compare_debian_package_versions(v1, v2){
    var _v1 = new Version(v1)
    var _v2 = new Version(v2)

    var epoch_version_comparison = compare_epoch_version(_v1, _v2)
    if (epoch_version_comparison !== EQUAL)
        return epoch_version_comparison

    var upstream_version_comparison = compare_upstream_version_numbers(_v1, _v2)
    if (upstream_version_comparison === EQUAL){
        return compare_revision_versions(_v1, _v2)
    }
    else
        return upstream_version_comparison
  }


  function Version(raw_version){
    var splitted_raw_version = split_raw_version(raw_version)
    this.epoch = extract_epoch_version(
        splitted_raw_version["epoch"])
    this.upstream = extract_upstream_version(
        splitted_raw_version["upstream"])
    this.revision = extract_revision_version(
        splitted_raw_version["revision"])
  }

  function split_raw_version(version){
     if(version.indexOf(":") !== -1){
        var raw_epoch = version.split(":")[0]
        var without_epoch_version = version.split(":")[1]
    }
    else{
        var raw_epoch = "0"
        var without_epoch_version = version
    }

    var raw_upstream = without_epoch_version.split("-")[0]

    if(without_epoch_version.indexOf("-") !== -1){
      var raw_revision = without_epoch_version.split("-")[1]
    }
    else{
      var raw_revision = "0"
    }

    return {
        "epoch": raw_epoch,
        "upstream": raw_upstream,
        "revision": raw_revision,
    }
  }

  function extract_epoch_version(version){
    return parseInt(version.split(":")[0])
  }

  function extract_upstream_version(version){
      return split_suffixable_version(version)
  }

  function split_suffixable_version(version){
    var VERSION_REGEXP = /(\w+)([~+]\w+)/g;
    if(version.search(VERSION_REGEXP) !== -1){
        var match = VERSION_REGEXP.exec(version);

        var post_digit = match[2]
        var without_post_digit = match[1]
    }
    else{
        var post_digit = ""
        var without_post_digit = version
    }

    var _digits = version.split(".")
    var digits = []
    for(var index=0; index < _digits.length; index++){
      digits.push(parseInt(_digits[index]))
    }

    return {"digits": digits, "post-digit": post_digit}
  }


  function extract_revision_version(version){
    return split_suffixable_version(version)
  }

  function compare_epoch_version(v1, v2){
    return compare_integer(v1.epoch, v2.epoch)
  }


  function compare_integer(i1, i2){
    if (i1 > i2)
        return GREATER
    if (i1 < i2)
        return LOWER
    return EQUAL
  }


  function compare_upstream_version_numbers(v1, v2){
    var upstream_digits_comparison = compare_integer_lists(v1.upstream["digits"], v2.upstream["digits"])

    if (upstream_digits_comparison === EQUAL){
        return compare_string_modifiers(v1.upstream["post-digit"], v2.upstream["post-digit"])
    }
    else
        return upstream_digits_comparison
  }

  function compare_string_modifiers(s1, s2){
    if (s1 > s2)
        return GREATER
    if (s1 < s2)
        return LOWER
    return EQUAL
  }

  function compare_revision_versions(v1, v2){
    var upstream_digits_comparison = compare_integer_lists(v1.revision["digits"], v2.revision["digits"])

    if (upstream_digits_comparison === EQUAL){
        return compare_string_modifiers(v1.revision["post-digit"], v2.revision["post-digit"])
    }
    else
        return upstream_digits_comparison
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

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

