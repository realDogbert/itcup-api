// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'eu-central-1',
//   endpoint: "http://localhost:8000"
});

// Create the DynamoDB service object
var docClient = new AWS.DynamoDB.DocumentClient();
const table = 'golfUsers';

const uuidv1 = require('uuid/v1');


getUsers = function get(userStatus) {

    var params = {
        TableName : table
      };
    
      if(userStatus) {
        params.FilterExpression = 'userStatus = :this_status';
        params.ExpressionAttributeValues = {':this_status' : userStatus};
      }
      
      return docClient.scan(params).promise();
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

deleteUser = function deleteUser(id) {

    var params = {
        TableName: table,
        Key: {
            'id': id
        }
    };
    
    return docClient.delete(params).promise();

}

createUser = function createUser(newUser) {

    if (!newUser.id) {
      newUser.id = uuidv1();
    }
    newUser.userName = newUser.lastName + ' ' + newUser.firstName;
    newUser.createdAt = new Date().getTime();
    newUser.updatedAt = new Date().getTime();
    if (!newUser.userStatus) {
        newUser.userStatus = 'registered';
    }
  
    return docClient.put({
        TableName: table,
        Item: newUser,
        ReturnValues: "ALL_OLD"
    }).promise();
}


updateUser = function updateUser(id, updatedUser) {

    if (!updatedUser.id) {
        updatedUser.id = id;
    }
    updatedUser.updatedAt = new Date().getTime();

    return docClient.put({ 
        TableName: table, 
        Item: updatedUser, 
        ReturnValues: "ALL_OLD"  }
        ).promise();

}

module.exports = { createUser, getUsers, getUser, deleteUser, updateUser };

