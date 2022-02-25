const { HttpRequest} = require("@aws-sdk/protocol-http");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const { Sha256 } = require("@aws-crypto/sha256-browser");

var region = 'us-east-1';
var domain = 'search-catalog-db-kzo4u3d3hywf53mehgc2zvdhku.us-east-1.es.amazonaws.com';
const index = 'products';

exports.handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);

    console.log('Received search event: ', requestBody.text);

    /* Multi match is used to search multiple fields.
       The ^ lets you “boost” certain fields. Boosts are multipliers that weigh matches in one field
       more heavily than matches in other fields.
       TODO: find out about analyzers (they allow us to split sentence into words, filter words out, use synonyms...) */
    const query = {
        'size': 25,
        'query': {
            'multi_match': {
                'query': requestBody.text,
                'fields': ['name^4', 'description']
            }
        }
    };

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
