// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'eu-central-1',
//   endpoint: "http://localhost:8000"
});

const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');

// Create the DynamoDB service object
var docClient = new AWS.DynamoDB.DocumentClient();
const table = 'users';


registerUser = async function registerUser(newUser) {

    if (!newUser.id) {
      newUser.id = uuidv1();
    }

    newUser.createdAt = new Date().getTime();
    newUser.updatedAt = new Date().getTime();

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
  
    return docClient.put({
        TableName: table,
        Item: newUser,
        ReturnValues: "ALL_OLD"
    }).promise();
}

getUser = function getUser(id) {
    
    var params = {
        TableName: table,
        Key: {
            'id': id
        }
    };

    return docClient.get(params).promise();
}

getUserByLoginName = async function getUserByLoginName(loginName) {

    var params = {
        TableName : table
    };

    params.FilterExpression = 'loginName = :this_loginName';
    params.ExpressionAttributeValues = {':this_loginName' : loginName};

    return docClient.scan(params).promise();

}

deleteUser = function deleteUser(id) {

    var params = {
        TableName: table,
        Key: {
            'id': id
        }
    };
    
    return docClient.delete(params).promise();

}


module.exports = { registerUser, getUser, getUserByLoginName, deleteUser };