const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const PERMISSION_LEVELS = {
  ADMIN: 1,
  USER: 0
};

const isAdmin = async senderId => {
  const permissionLevel = getPermissionLevel(senderId);
  if (permissionLevel) {
    return permissions.permissionLevel === PERMISSION_LEVELS.ADMIN
  };
  return false;
}

const getPermissionLevel = async senderId => {
  const params = {
    TableName: process.env.PERMISSIONS_TABLE,
    Key: {
      senderId
    },
    ProjectionExpression: "senderId, permissionLevel"
  };

  try {
    const result = await dynamoDB.get(params).promise();
    if (result.Item) {
      return result.Item.permissionLevel;
    }

    return PERMISSION_LEVELS.USER;

  } catch (err) {
    throw err;
  }
}

module.exports = {
  isAdmin,
  getPermissionLevel,
  PERMISSION_LEVELS
}
