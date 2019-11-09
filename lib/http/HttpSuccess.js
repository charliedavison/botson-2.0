'use strict';

class HttpSuccess {
    constructor(body, headers, statusCode = 200) {
        this.body = body;
        this.headers = headers;
        this.statusCode = statusCode;
    }
}

module.exports = HttpSuccess;
