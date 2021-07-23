'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const { getSpeechResponse } = require('../../utils.js');

exports.sign = async (senderId, args) => {
  const message = args.join(' ');
  const params = {
    TableName: 'guestbookTable',
    Item: {
      messageId: uuid.v1(),
      senderId,
      message,
      dateSigned: new Date().toISOString()
    }
  }

  try {
    await dynamoDB.put(params).promise();
    return getSpeechResponse('guestbook_signed')
  } catch (err) {
    throw err;
  }
}

exports.view = async () => {
  const params = {
    TableName: 'guestbookTable',
    ProjectionExpression: "messageId, message, dateSigned"
  }

  try {
    const result = await dynamoDB.scan(params).promise();
    if (result.Items && !!result.Items.length) {
      return result.Items.reduce((acc, item) => {
        return acc += `###############################################\r\n\r\n${item.message}\r\n\r\n`;
      }, '')
    }

    return getSpeechResponse('guestbook_empty');

  } catch (err) {
    throw err;
  }
}
