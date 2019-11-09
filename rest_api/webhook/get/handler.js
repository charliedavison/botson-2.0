'use strict';
const HttpSuccess = require('../../../lib/http/HttpSuccess');
const HttpError = require('../../../lib/http/HttpError');

exports.handle = async (event) => {
  const { queryStringParameters } = event;

  if (queryStringParameters['hub.verify_token'] === process.env.VERIFY_TOKEN && queryStringParameters['hub.challenge']) {
      return new HttpSuccess(queryStringParameters['hub.challenge'])
  }
  return new HttpError(403);
};