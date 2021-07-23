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
      dateSigned: new Date().toISOString()
    }
  }

  try {
    await dynamoDB.put(params).promise();
    return `Thankyou for signing the guestbook! Use -viewbook to view the other entries.`;
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

    return 'The guestbook is empty!'

  } catch (err) {
    throw err;
  }



}
