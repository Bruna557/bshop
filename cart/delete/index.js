// DOCUMENTATION: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
const { DynamoDB, BatchWriteItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb')

const region = 'us-east-1'
const db = new DynamoDB({ 'region': region })

exports.handler = (event, context, callback) => {
    console.log('Received DeleteCart request', event)

    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback)
        return
    }

    const user = event.requestContext.authorizer.claims['cognito:username']

    console.log(`Deleting cart: user ${user}`)

    deleteCart(user).then((response) => {
        callback(null, response)
    }).catch((err) => {
        console.error('Error processing DeleteCart request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

function deleteCart(user) {
    // Retrieve products
    let products = []
    let params = {
        TableName: "cart",
        KeyConditionExpression: "username = :user",
        ExpressionAttributeValues: {
            ":user": { S: user }
        }
    }
    return db.send(new QueryCommand(params))
        .then((response) => {
            products = response.Items
            console.log('########################')
            console.log(response.Items)
            console.log('########################')

            // Delete products
            params = {
                RequestItems: {
                    'cart': products.map((p) => {
                        return {
                            DeleteRequest: {
                                Key: {
                                    'username': { S: user },
                                    'product_id': p.product_id
                                }
                            }
                        }
                    })
                }
            }
            return db.send(new BatchWriteItemCommand(params))
        })
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
