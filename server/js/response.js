'use strict';

module.exports.create = function () {
    var response = {
       meta: {
           status: "OK",
           code: 200
       },
       data: []
    };

    return response;
}


module.exports.createError = function(code, status, error) {
    var response = {
        meta: {
            status: status,
            code: code,
            error: error
        },
        data: null
    }

    return response;
}
