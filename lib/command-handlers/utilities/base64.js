'use strict';
exports.encode = (_, [messageText]) => new Buffer(messageText).toString('base64');
exports.decode = (_, [messageText]) => new Buffer(messageText, 'base64').toString('ascii');