'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.sign = async (senderId, args) => {
  const message = args.join(' ');
  const params = {
    TableName: 'guestbookTable',
    Item: {
      messageId: uuid.v1(),
      senderId,
      message,
      timestamp: new Date().toISOString()
    }
  }

  try {
    await dynamoDB.put(params).promise();
    return `Thanks for signing the guestbook!`;
  } catch (err) {
    throw err;
  }
}

exports.view = async () => {
  const params = {
    TableName: 'guestbookTable',
    ProjectionExpression: "message, timestamp"
  }

  try {
    const result = dynamoDB.query(params).promise();
    result.reduce((acc, item) => {
      return `###############################################\r\n\r\n
              ${item.message}
              ###############################################\r\n\r\n
              `;
    }, '')

  } catch (err) {
    throw err;
  }



}
