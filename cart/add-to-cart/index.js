// DOCUMENTATION: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
const { DynamoDB, PutItemCommand } = require('@aws-sdk/client-dynamodb')

const region = 'us-east-1'
const db = new DynamoDB({ 'region': region })

exports.handler = (event, context, callback) => {
    console.log('Received AddToCart request', event)

    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback)
        return
    }

    const user = event.requestContext.authorizer.claims['cognito:username']
    const product_id = event.pathParameters.id
    const product = event.body  // API Gateway stringifies the body
    console.log(`Adding product to cart: user ${user}, product_id ${product_id}`)

    addToCart(user, product_id, product).then((response) => {
        callback(null, {
            statusCode: response.$metadata.httpStatusCode,
            headers:  { 'Access-Control-Allow-Origin': '*' }
        })
    }).catch((err) => {
        console.error('Error processing AddToCart request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

function addToCart(user, product_id, product) {
    const params = {
        TableName: 'cart',
        Item: {
            "username": { S: user },
            "product_id": { S: product_id },
            "product": { S: product }
        }
    }
    return db.send(new PutItemCommand(params))
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
