const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')

const s3Client = new S3Client({ region: 'us-east-1' })

exports.handler = (event, context, callback) => {
    console.log('Received GetCopy request', event)

    const language = event.queryStringParameters?.language || 'en'

    getCopy(language).then((copy) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(copy),
            headers:  { 'Access-Control-Allow-Origin': '*' }
        })
    }).catch((err) => {
        console.error('Error processing GetCopy request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

async function getCopy(language) {
    const bucketParams = {
        Bucket: 'bshop-anvqdwjh',
        Key: `localization/local_${language}.json`,
    }

    // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
    const response = await s3Client.send(new GetObjectCommand(bucketParams))

    return new Promise((resolve, reject) => {
        const chunks = []
        response.Body.on('data', (chunk) => chunks.push(chunk))
        response.Body.on('error', reject)
        response.Body.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: { 'Access-Control-Allow-Origin': '*' },
    })
}
