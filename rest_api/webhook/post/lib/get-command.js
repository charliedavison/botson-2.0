'use strict';
const get = require('lodash/get');
const speach = require('./../../../../config/speach.json');
const commandHandlers = require('./../../../../lib/command-handlers');

module.exports = messageText => {
  // For now we're just assuming that a command can have one param.
  const [commandText, param] = messageText.split(' ');
  const command = speach.commands.find(command => command.command_text === commandText);

  if (!command) return speach.not_recognised;

  if (command.handler) {
    return callHandlerFunc(command, param)
  }

  return command;
};

const callHandlerFunc = (command, param) => {
  const { handler } = command;
  const handlerFunc = get(commandHandlers, handler);

  return {
   response: handlerFunc(param),
    ...command
  };
};