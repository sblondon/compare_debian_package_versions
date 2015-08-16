(function(exports) {
  "use strict";

  function compare_debian_package_versions(v1, v2){
    var _v1 = parseInt(v1)
    var _v2 = parseInt(v2)
    if (_v1 > _v2)
        return 1
    else {
        if (_v1 < _v2)
            return -1
        else
            return 0
    }
  }

  exports.compare_debian_package_versions = compare_debian_package_versions;
})(this);

