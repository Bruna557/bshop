const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});
var db = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback);
        return;
    }

    var user = event.requestContext.authorizer.claims['cognito:username'];
    // var requestBody = JSON.parse(event.body);  // for local testing
    // var user = requestBody.user;  // for local testing

    console.log(`Received GetCart request: user ${user}`);

    getCart(user).then((response) => {
        // console.log(response);  // for local testing
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(response),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
}

function getCart(user) {
    return db.get({
        TableName: 'Cart',
        Key: { id: user }
    }).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}
