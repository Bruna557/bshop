const { HttpRequest} = require('@aws-sdk/protocol-http')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const { SignatureV4 } = require('@aws-sdk/signature-v4')
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler')
const { Sha256 } = require('@aws-crypto/sha256-browser')

const REGION = process.env.AWS_REGION
const CATALOG_DB_DOMAIN = process.env.CATALOG_DB_DOMAIN
const INDEX = 'products'

exports.handler = (event, context, callback) => {
    console.log('Received SearchProducts request', event)

    const size = event.queryStringParameters?.size || 15
    const page = event.queryStringParameters?.page || 1
    const q = event.queryStringParameters?.q

    /**
     * Multi match is used to search multiple fields.
     * The ^ lets you “boost” certain fields. Boosts are multipliers that
     * weigh matches in one field more heavily than matches in other fields.
     *
     * If the parameter 'q' was not provided, use 'match_all' to retrieve all products.
    */
    const query = q ? {'multi_match':{'query': q,'fields': ['name^4', 'description']}} : {'match_all': {}}
    const payload = {
        'size': size,
        'from': (page-1) * size,
        'query': query
    }

    queryCatalog(payload).then((response) => {
        callback(null, {
            statusCode: response.statusCode,
            body: response.body,
            headers:  { 'Access-Control-Allow-Origin': '*' }
        })
    }).catch((err) => {
        console.error('Error processing SearchProducts request', err)
        errorResponse(err.message, context.awsRequestId, callback)
    })
}

async function queryCatalog(query) {
    const request = new HttpRequest({
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
            'host': CATALOG_DB_DOMAIN
        },
        hostname: CATALOG_DB_DOMAIN,
        method: 'POST',
        path: INDEX + '/_search'
    })

    const signer = new SignatureV4({
        credentials: defaultProvider(),
        region: REGION,
        service: 'es',
        sha256: Sha256
    })

    const signedRequest = await signer.sign(request)

    const client = new NodeHttpHandler()
    const {response} = await client.handle(signedRequest)
    return new Promise((resolve) => {
        const {statusCode, statusMessage, headers} = response
        let body = ''
        response.body.on('data', (chunk) => {
            body += chunk
        })
        response.body.on('end', () => {
            const data = {statusCode, statusMessage, headers}
            if (body) {
                data.body = body
            }
            resolve(data)
        })
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
