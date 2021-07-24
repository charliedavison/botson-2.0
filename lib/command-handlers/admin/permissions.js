const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { getSpeechResponse } = require('../../utils.js');
const { PERMISSION_LEVELS } = require('../../permissions.js');

exports.addAdmin = async senderId => {
  const params = {
    TableName: process.env.PERMISSIONS_TABLE,
    Item: {
      senderId,
      permissionLevel: PERMISSION_LEVELS.ADMIN
    }
  };

  try {
    await dynamoDB.put(params).promise();
    return getSpeechResponse('admin_added');
  } catch (err) {
    throw err;
  }
}