'use strict';
exports.encode = messageText => new Buffer(messageText).toString('base64');
exports.decode = messageText => new Buffer(messageText, 'base64').toString('ascii');