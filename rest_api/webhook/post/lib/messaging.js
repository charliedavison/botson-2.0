'use strict';
const request = require('request-promise');
const getCommand = require('./get-command');

// 0 to disable the typing indicator completely.
const TYPING_MS = parseInt(process.env.TYPING_MS || 0);

exports.handleReceivedMessage = async event => {
    const senderId = event.sender.id;
    const {
      text: messageText,
    } = event.message;

  try {
    await addTypingDelay(senderId);

    const {response, response_type} = getCommand(messageText);

    console.log('test pr')

    switch (response_type) {
      case 'text':
        await sendTextMessage(senderId, response);
        break;
    }

  } catch (e) {
    await sendTextMessage(senderId,'An error occurred.');
    throw(e);
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

const addTypingDelay = async senderId => {
  if (!TYPING_MS) return;

  const getTypingIndicatorPayload = isTyping => ({
    recipient: {
      id: senderId
    },
    sender_action: `typing_${isTyping ? 'on' : 'off'}`
  });

  await callSendAPI(getTypingIndicatorPayload(true));
  await new Promise(resolve => setTimeout(resolve, TYPING_MS));
  await callSendAPI(getTypingIndicatorPayload(false));
};

const callSendAPI = async messageData => {
  await request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": messageData
  });
};
