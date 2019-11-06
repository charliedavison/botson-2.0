'use strict';

class HttpError {
    constructor(statusCode, message) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = HttpError;

