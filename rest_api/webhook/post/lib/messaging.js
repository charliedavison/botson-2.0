'use strict';
const request = require('request-promise');
const getCommand = require('./get-command');

exports.handleReceivedMessage = async event => {
  const senderId = event.sender.id;
  const {
    text: messageText,
  } = event.message;

  const {response, response_type} = getCommand(messageText);

  switch (response_type) {
    case 'text':
      await sendTextMessage(senderId, response);
      break;
  }
};

const sendTextMessage = async (senderId, messageText) => {
  const messageData = {
    recipient: {
      id: senderId
    },
    message: {
      text: messageText
    }
  };

  await callSendAPI(messageData);
};

const callSendAPI = async messageData => {
  await request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": messageData
  });
};