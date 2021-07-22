'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.sign = async (senderId, args) => {
  const message = args.join(' ');
  const data = {
    TableName: 'guestbookTable',
    Item: {
      messageId: uuid.v1(),
      senderId,
      message,
      date: new Date().toISOString()
    }
  }

  try {
    await dynamoDB.put(data).promise();
    return `Thanks for signing the guestbook!`;
  } catch (err) {
    return `An error occurred: ${err}`;
  }

}
