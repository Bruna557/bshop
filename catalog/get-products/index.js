const { HttpRequest} = require('@aws-sdk/protocol-http');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler');
const { Sha256 } = require('@aws-crypto/sha256-browser');

const region = 'us-east-1';
const domain = 'search-catalog-db-kzo4u3d3hywf53mehgc2zvdhku.us-east-1.es.amazonaws.com';
const index = 'products';

exports.handler = (event, context, callback) => {
    var size = event.queryStringParameters.size || 15;
    var page = event.queryStringParameters.page || 1;

    var query = {
        'size': size,
        'from': (page-1) * size,
        'query': {
            'match_all': {}
        }
    };

    queryCatalog(query).then((response) => {
        callback(null, {
            statusCode: response.statusCode,
            body: JSON.stringify(response.body),
            headers: response.headers,
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
}

async function queryCatalog(query) {
    var request = new HttpRequest({
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
            'host': domain
        },
        hostname: domain,
        method: 'POST',
        path: index + '/_search'
    });

    var signer = new SignatureV4({
        credentials: defaultProvider(),
        region: region,
        service: 'es',
        sha256: Sha256
    });

    var signedRequest = await signer.sign(request);

    var client = new NodeHttpHandler();
    var {response} = await client.handle(signedRequest);
    return new Promise((resolve) => {
        const {statusCode, statusMessage, headers} = response;
        var body = '';
        response.body.on('data', (chunk) => {
            body += chunk;
        });
        response.body.on('end', () => {
            const data = {statusCode, statusMessage, headers};
            if (body) {
                data.body = body;
            }
            resolve(data);
        });
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
    });
}
