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
    const product = event.body.product

    console.log(`Adding product to cart: user ${user}, product ${JSON.stringify(product)}`)

    addToCart(user, product).then((response) => {
        callback(null, response)
    }).catch((err) => {
        console.error('Error processing AddToCart request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

function addToCart(user, product) {
    const params = {
        TableName: 'cart',
        Item: {
            "username": { S: user },
            "product_id": { S: product.id },
            "product": { S: JSON.stringify(product) }
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
