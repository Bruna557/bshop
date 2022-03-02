var AWS = require('aws-sdk');

const region = 'us-east-1';
const domain = 'search-catalog-db-kzo4u3d3hywf53mehgc2zvdhku.us-east-1.es.amazonaws.com';
const index = 'products';

exports.handler = (event, context, callback) => {
    var requestBody = JSON.parse(event.body);

    console.log(`Received SearchProducts request: ${requestBody.text}`);

    /**
     * Multi match is used to search multiple fields.
     * The ^ lets you “boost” certain fields. Boosts are multipliers that
     * weigh matches in one field more heavily than matches in other fields.
    */
    var query = {
        'size': 15,
        'query': {
            'multi_match': {
                'query': requestBody.text,
                'fields': ['name^4', 'description']
            }
        }
    };

    queryOpenSearch(query).then((response) => {
        callback(null, {
            statusCode: response.statusCode,
            body: JSON.stringify(response.body),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
}

function queryOpenSearch(query) {
    var endpoint = new AWS.Endpoint(domain);
    var request = new AWS.HttpRequest(endpoint, region);

    request.method = 'POST';
    request.path += index + '/_search';
    request.body = JSON.stringify(query);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    request.headers['Content-Length'] = Buffer.byteLength(request.body);

    var credentials = new AWS.EnvironmentCredentials('AWS');
    var signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    var client = new AWS.HttpClient();
    return new Promise((resolve, reject) => {
        client.handleRequest(
            request,
            null,
            (response) => {
                const {statusCode, statusMessage, headers} = response;
                let body = '';
                response.on('data', (chunk) => {
                    body += chunk;
                });
                response.on('end', () => {
                    const data = {statusCode, statusMessage, headers};
                    if (body) {
                        data.body = body;
                    }
                    resolve(data);
                });
            },
            (error) => {
                reject(error);
            }
        );
    })
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}
