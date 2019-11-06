'use strict';
const HttpSuccess = require('../../../lib/HttpSuccess.js');

exports.handle = async (event) => {
    // TODO: Handle incoming events
    console.log(event);
    return new HttpSuccess();
};