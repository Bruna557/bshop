const { readFileSync } = require('fs');
const { HttpRequest} = require('@aws-sdk/protocol-http');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler');
const { Sha256 } = require('@aws-crypto/sha256-browser');

var region = 'us-east-1';
var domain = 'search-catalog-db-kzo4u3d3hywf53mehgc2zvdhku.us-east-1.es.amazonaws.com';

const data = readFileSync('./data/products.bulk');
bulkInsert(data.toString()).then(() => process.exit());

async function bulkInsert(data) {
    var request = new HttpRequest({
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'host': domain
        },
        hostname: domain,
        method: 'POST',
        path: '/_bulk'
    });

    var signer = new SignatureV4({
        credentials: defaultProvider(),
        region: region,
        service: 'es',
        sha256: Sha256
    });

    var signedRequest = await signer.sign(request);

    var client = new NodeHttpHandler();
    var { response } =  await client.handle(signedRequest)
    console.log(response.statusCode + ' ' + response.body.statusMessage);
    var responseBody = '';
    await new Promise(() => {
        response.body.on('data', (chunk) => {
            responseBody += chunk;
        });
        response.body.on('end', () => {
            console.log('Response body: ' + responseBody);
        });
    }).catch((error) => {
        console.log('Error: ' + error);
    });
}