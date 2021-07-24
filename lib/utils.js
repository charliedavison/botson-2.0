const get = require('lodash/get');
const speech = require('../config/speech.json');

exports.getSpeechResponse = (key) => {
  const commandObject = get(speech, key);
  if (commandObject) {
    return commandObject.response;
  }

  throw 'Invalid speech key.';
};