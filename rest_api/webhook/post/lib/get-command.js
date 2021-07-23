'use strict';
const get = require('lodash/get');
const speech = require('./../../../../config/speech.json');
const commandHandlers = require('./../../../../lib/command-handlers');

module.exports = async (senderId, messageText) => {
  const [commandText, ...args] = messageText.split(' ');
  const command = speech.commands.find(command => command.command_text === commandText);

  if (!command) return speech.not_recognised;

  if (command.handler) {
    return await callHandlerFunc(senderId, command, args)
  }

  return command;
};

const callHandlerFunc = async (senderId, command, args) => {
  const { handler } = command;
  const handlerFunc = get(commandHandlers, handler);

  return {
   response: await handlerFunc(senderId, args),
    ...command
  };
};