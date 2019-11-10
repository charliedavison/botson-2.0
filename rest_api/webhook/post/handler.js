'use strict';
const HttpSuccess = require('../../../lib/http/HttpSuccess.js');
const HttpError = require('../../../lib/http/HttpError.js');
const { handleReceivedMessage } = require('./lib/messaging');

exports.handle = async event => {
  const { entry, object } = JSON.parse(event.body);

  if (object !== 'page') return new HttpError(404);

  try {
    for (const pageEntry of entry) {
      for (const messagingEvent of pageEntry.messaging) {
        if (messagingEvent.message) {
          await handleReceivedMessage(messagingEvent);
        }
      }
    }

    return new HttpSuccess();

  } catch (err) {
    console.error(err);
    return new HttpSuccess();
  }
};
