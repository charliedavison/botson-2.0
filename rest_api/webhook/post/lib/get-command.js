'use strict';
const get = require('lodash/get');
const speach = require('./../../../../config/speach.json');
const commandHandlers = require('./../../../../lib/command-handlers');

module.exports = messageText => {
  let command = speach.commands.find(command => command.command_text === messageText.split(' ')[0]);
  if (!command) return speach.not_recognised;

  const { handler } = command;

  if (handler) {
    return callHandlerFunc(command, messageText)
  }

  return command;
};

const callHandlerFunc = (command, messageText) => {
  const { command_text, handler } = command;
  const handlerFunc = get(commandHandlers, handler);

  // For now we'll just imagine a handler can only accept one param. May need to update this later.
  const param = messageText.substring(command_text.length, messageText.length);

  return {
   response: handlerFunc(param),
    ...command
  };
};