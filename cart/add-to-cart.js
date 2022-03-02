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
    var requestBody = JSON.parse(event.body);

    console.log(`Received AddToCart request: user ${user}, product ${requestBody.product.id}`);

    addToCart(user, requestBody.product).then(() => {
        callback(null, {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
}

function addToCart(user, product) {
    return db.update({
        TableName: 'Cart',
        Key: { id: user },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set #products = list_append(if_not_exists(#products, :empty_list), :product)',
        ExpressionAttributeNames: {
            '#products': 'products'
        },
        ExpressionAttributeValues: {
            ':product': [product],
            ':empty_list': []
        }
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
