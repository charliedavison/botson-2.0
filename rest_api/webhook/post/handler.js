'use strict';
const HttpSuccess = require('../../../lib/HttpSuccess.js');
const HttpError = require('../../../lib/HttpError.js');
const { handleReceivedMessage } = require('./lib/messaging');

exports.handle = async event => {
  const { entry, object } = JSON.parse(event.body);

  if (object !== 'page') return new HttpError(404);

  for (const pageEntry of entry) {
    for (const messagingEvent of pageEntry.messaging) {
      if (messagingEvent.message) {
        await handleReceivedMessage(messagingEvent);
      }
    }
  }

  return new HttpSuccess();
};
