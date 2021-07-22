'use strict';
const get = require('lodash/get');
const speach = require('./../../../../config/speach.json');
const commandHandlers = require('./../../../../lib/command-handlers');

module.exports = async messageText => {
  const [commandText, ...args] = messageText.split(' ');
  const command = speach.commands.find(command => command.command_text === commandText);

  if (!command) return speach.not_recognised;

  if (command.handler) {
    return await callHandlerFunc(command, args)
  }

  return command;
};

const callHandlerFunc = async (command, args) => {
  const { handler } = command;
  const handlerFunc = get(commandHandlers, handler);

  return {
   response: await handlerFunc(args),
    ...command
  };
};