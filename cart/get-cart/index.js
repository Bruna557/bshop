// DOCUMENTATION: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
const { DynamoDB, QueryCommand } = require('@aws-sdk/client-dynamodb')
const { unmarshall } = require('@aws-sdk/util-dynamodb')

const REGION = process.env.AWS_REGION
const db = new DynamoDB({ 'region': REGION })

exports.handler = (event, context, callback) => {
    console.log('Received GetCart request', event)

    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback)
        return
    }

    const user = event.requestContext.authorizer.claims['cognito:username']

    console.log(`Fetching cart: user ${user}`)

    getCart(user).then((response) => {
        // API Gateway throws error 500 if you pass a json in the body or no status code
        callback(null, {
            statusCode: response.$metadata.httpStatusCode,
            body: JSON.stringify(response.Items.map((i) => unmarshall(i))),
            headers:  { 'Access-Control-Allow-Origin': '*' }
        })
    }).catch((err) => {
        console.error('Error processing GetCart request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

function getCart(user) {
    const params = {
        TableName: "cart-db",
        KeyConditionExpression: "username = :user",
        ExpressionAttributeValues: {
            ":user": { S: user }
        }
    }
    return db.send(new QueryCommand(params))
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: {
            Error: errorMessage,
            Reference: awsRequestId,
        },
        headers: { 'Access-Control-Allow-Origin': '*' }
    })
}
