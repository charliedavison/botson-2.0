'use strict';

class HttpError {
  constructor(statusCode, message) {
    this.body = message;
    this.statusCode = statusCode;
  }
}
module.exports = HttpError;

