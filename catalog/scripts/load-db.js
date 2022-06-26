const { readFileSync } = require('fs')
const { HttpRequest} = require('@aws-sdk/protocol-http')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const { SignatureV4 } = require('@aws-sdk/signature-v4')
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler')
const { Sha256 } = require('@aws-crypto/sha256-browser')

const REGION = process.env.AWS_REGION
const CATALOG_DB_DOMAIN = process.env.CATALOG_DB_DOMAIN

const data = readFileSync('./data/products.bulk')
bulkInsert(data.toString()).then(() => process.exit())

async function bulkInsert(data) {
    const request = new HttpRequest({
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'host': CATALOG_DB_DOMAIN
        },
        hostname: CATALOG_DB_DOMAIN,
        method: 'POST',
        path: '/_bulk'
    })

    const signer = new SignatureV4({
        credentials: defaultProvider(),
        region: REGION,
        service: 'es',
        sha256: Sha256
    })

    const signedRequest = await signer.sign(request)

    const client = new NodeHttpHandler()
    let { response } =  await client.handle(signedRequest)
    console.log(response.statusCode + ' ' + response.body.statusMessage)
    let responseBody = ''
    await new Promise(() => {
        response.body.on('data', (chunk) => {
            responseBody += chunk
        })
        response.body.on('end', () => {
            console.log('Response body: ' + responseBody)
        })
    }).catch((error) => {
        console.log('Error: ' + error)
    })
}
