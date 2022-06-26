// DOCUMENTATION: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
const { DynamoDB, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')

const REGION = process.env.AWS_REGION
const db = new DynamoDB({ 'region': REGION })

exports.handler = (event, context, callback) => {
    console.log('Received RemoveFromCart request', event)

    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback)
        return
    }

    const user = event.requestContext.authorizer.claims['cognito:username']
    const product_id = event.pathParameters.id

    console.log(`Removing product from cart: user ${user}, product_id ${product_id}`)

    removeFromCart(user, product_id).then((response) => {
        callback(null, {
            statusCode: response.$metadata.httpStatusCode,
            headers:  { 'Access-Control-Allow-Origin': '*' }
        })
    }).catch((err) => {
        console.error('Error processing RemoveFromCart request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

function removeFromCart(user, product_id) {
    var params = {
        TableName: "cart-db",
        Key: {
         "username": { S: user },
         "product_id": { S: product_id }
        }
    }
    return db.send(new DeleteItemCommand(params))
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: {
            Error: errorMessage,
            Reference: awsRequestId,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
}
