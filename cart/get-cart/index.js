const { DynamoDB, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const region = 'us-east-1';
const db = new DynamoDB({ 'region': region });

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback);
        return;
    }

    var user = event.requestContext.authorizer.claims['cognito:username'];

    console.log(`Received GetCart request: user ${user}`);

    getCart(user).then((response) => {
        callback(null, {
            statusCode: response.$metadata.httpStatusCode,
            body: JSON.stringify(unmarshall(response.Item)),
            headers:  { 'Access-Control-Allow-Origin': '*' }
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
}

function getCart(user) {
    var params = {
        TableName: 'Cart',
        Key: {
            id: { S: user }
        }
    }
    return db.send(new GetItemCommand(params));
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: { 'Access-Control-Allow-Origin': '*' }
    });
}
