# README
This is the final project of my specialization on Distributed Software Architecture.
bShop is an e-commerce system developed for academic purposes. The diagram below shows the proposed architecture:

![architecture](./architecture.png)

This is a PoC, and only the following services and features will be implemented:
- Catalog Service: products stored in AWS OpenSearch
  - Feature 'retrieve all products'
  - Feature 'full-text search': use query param `q` to search for products looking at fields `name` (weight 4) and `description` (weight 1)
- Cart Service: users shopping carts stored in AWS DynamoDB (username -> list of products)
  - Feature 'add to cart'
  - Feature 'remove from cart'
  - Feature 'get cart'
  - Feature 'delete cart'
- Recommendation Service: graph database implemented with AWS Neptune where we have users and products nodes and edges represent purchases
  - Feature 'get recommendation': when an user selects a product P, look for other products bought by users who also bought P
- User Service: users stored in AWS Cognito
  - Feature 'login'

Each endpoint in the following table corresponds to a serverless function. `user` is determined based on the ID_TOKEN provided on the Authorization header.
Endpoint            | HTTP method | Description
--------------------|-------------| -----------
catalog/            | GET         | Get products (query params `q`, `size` and `page`)
cart/               | GET         | Get `user` cart
cart/               | POST        | Add product to `user` cart
cart/{id}           | PUT         | Remove product from `user` cart
cart/               | DELETE      | Delete `user` cart
<!-- recommendation/{id} | GET         | Get a list of recommended products
user/login          | POST        | Get `ACCESS_TOKEN`, `ID_TOKEN` and `REFRESH_TOKEN` -->

The frontend is a Single-Page Application developed with React:
- Home: shows a grid with all products.
- Search results: users are redirected here after performing a full-text search; grid of products similar to Home.
- Product: users are redirected here after selecting a product; shows product description, 'Add to cart' button and a list of recommended products
- Cart: shows list of products in user's cart with 'Remove' buttons
- Login: not logged-in users are redirected here if they try to add a product to cart

In the following sections I added instructions for local testing and manual deployment to serve as a guide for my future self and anyone learning about serverless development.
## Local testing
Create a DynamoDB table (DynamoDB -> Tables -> Create) called "cart" with partition key "username" (string) and sort key "product_id" (string).

Create an OpenSearch domain; in `catalog/search/index.js` change the value of `domain` to the domain endpoint you created (without https://).

Create a Cognito user pool and an app client; change the pool data accordingly in `user/scripts`.

Export your AWS credentials:
```bash
$ export AWS_ACCESS_KEY_ID=<YOUR-ACCESS-KEY>
$ export AWS_SECRET_ACCESS_KEY=<YOUR-SECRET-KEY>
```

Load CatalogDB with dummy data (`catalog/data/products.bulk`):
```bash
$ node catalog/load-db.js
```

Search:
```bash
$ node -e 'require("./catalog/search-products/index.js").handler({"queryStringParameters":{"size":5,"page":1,"q":"RGB water asdf Intel"}},{"awsRequestId":"local-test"},console.log)'
```

Get all products:
```bash
$ node -e 'require("./catalog/search-products/index.js").handler({"queryStringParameters":{"size":5,"page":1}},{"awsRequestId":"local-test"},console.log)'
```

Get cart:
```bash
$ node -e 'require("./cart/get-cart/index.js").handler({"requestContext":{"authorizer":{"claims":{"cognito:username":"bruna@gmail.com"}}}},{"awsRequestId":"local-test"},console.log)'
```

Add product to cart:
```bash
$ node -e 'require("./cart/add-to-cart/index.js").handler({"pathParameters":{"id":"1"},"body":"{\"id\":\"1\",\"name\":\"some name\",\"description\":\"some description\",\"image_url\":\"some url\",\"price\":123.4}","requestContext":{"authorizer":{"claims":{"cognito:username":"bruna@gmail.com"}}}},{"awsRequestId":"local-test"},console.log)'
```

Remove product from cart:
```bash
$ node -e 'require("./cart/remove-from-cart/index.js").handler({"pathParameters":{"id":"1"},"requestContext":{"authorizer":{"claims":{"cognito:username":"bruna@gmail.com"}}}},{"awsRequestId":"local-test"},console.log)'
```

Delete cart:
```bash
$ node -e 'require("./cart/delete-cart/index.js").handler({"requestContext":{"authorizer":{"claims":{"cognito:username":"bruna@gmail.com"}}}},{"awsRequestId":"local-test"},console.log)'
```

## Manual deploy
First we need to create policies and roles to grant our lambdas permission to perform actions against DynamoDb, OpenSearch and CloudWatch.
Create an IAM policy (IAM -> Policies -> Create policy); in the JSON editor, paste the following:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:DeleteItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:Query",
                "es:ESHttpPost",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```
Alternatively, you can create multiple policies and roles and grant only the necessary permissions to each lambda.

Create an IAM role (IAM -> Roles -> Create role). As "Trusted entity type" select "AWS Service", and as "Use case" select "Lambda"; attach the policy you just created.

Recursively zip everything inside a lambda folder, including `node_modules`. Example (linux):
```bash
$ cd catalog/search
$ npm i
$ zip -r search-products.zip .
```

Create Lambda functions (Lambda -> Functions -> Create function) with runtime "Node.js 16.x"; in permission chose the role you created. Upload the zip files.
You can test your lambdas using the events under `./events`.

Create a REST API with API Gateway (API Gateway -> Create API -> Rest API -> Build). Create two resources, `/catalog` and `/cart`, with CORS enabled. Inside `/cart` create a resource `/{id}`, also with CORS enabled. Create the following methods with integration type "Lambda Function" and using Lambda Proxy integration:

Resource   | HTTP method | Lambda function
-----------|-------------| ---------------
catalog/   | GET         | search-products
cart/      | GET         | get-cart
cart/      | DELETE      | delete-cart
cart/{id}  | POST        | add-to-cart
cart/{id}  | PUT         | remove-from-cart


On the left panel, click "Authorizers" and create a new authorizer of type "Cognito", token source "Authorization" and attach your Cognito user pool.

Edit all your cart methods (under "Resources" click on the method and then click "Method Request") to add authorization. Also edit the `POST /cart` method to add request body with content type `application/json` and edit the `GET /catalog` method to add query string parameters `size`, `page` and `q`.

Deploy your API (Actions -> Deploy API)

## Testing with cURL
After the services are deployed to AWS, you can send requests with cURL.
To obtain an `ID_TOKEN`, run the login script:
```bash
$ node -e 'require("./user/scripts/login.js").handler("bruna@gmail.com","a1s2d3f4")'
```

Searching for products:
```bash
curl '<API_GATEWAY_URL>/catalog?q=rgb%20intel%20water%20proof'
```

Get cart:
```bash
curl '<API_GATEWAY_URL>/cart' -H 'Authorization: <ID_TOKEN>'
```

Add to cart:
```bash
curl -X POST '<API_GATEWAY_URL>/cart/1' -d '{"id":"1","name":"some name","description":"some description","image_url":"some url","price":124}' -H 'Content-Type: application/json' -H 'Authorization: <ID_TOKEN>'
```

Remove from cart:
```bash
curl -X PUT '<API_GATEWAY_URL>/cart/1' -H 'Authorization: <ID_TOKEN>'
```

Delete cart:
```bash
curl -X DELETE '<API_GATEWAY_URL>/cart' -H 'Authorization: <ID_TOKEN>'
```
