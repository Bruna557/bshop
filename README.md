# README
bShop is a PoC e-commerce system developed as the final project of my specialization on Distributed Software Architecture. The diagram below shows the proposed architecture:

![architecture](./architecture.png)

Only the following services and features will be implemented in this PoC:
- Catalog Service (done): products stored in AWS OpenSearch
  - Feature 'retrieve all products'
  - Feature 'full-text search': use query param `q` to search for products looking at fields `name` (weight 4) and `description` (weight 1)
- Cart Service (done): users shopping carts stored in AWS DynamoDB (username -> list of products)
  - Feature 'add to cart'
  - Feature 'remove from cart'
  - Feature 'get cart'
  - Feature 'delete cart'
- Recommendation Service (to do): graph database implemented with AWS Neptune where we have users and products nodes and edges represent purchases
  - Feature 'get recommendation': when an user selects a product P, look for other products bought by users who also bought P

Each endpoint in the following table corresponds to a serverless function. `user` is determined based on the `ID_TOKEN` provided in the Authorization header.
Endpoint            | HTTP method | Description
--------------------|-------------| -----------
catalog/            | GET         | Get products (query params `q`, `size` and `page`)
cart/               | GET         | Get `user` cart
cart/               | DELETE      | Delete `user` cart
cart/{id}           | POST        | Add product to `user` cart
cart/{id}           | PUT         | Remove product from `user` cart
localization/       | GET         | Get localization file (query param `lang`) from S3
recommendation/{id} | GET         | Get a list of recommended products based on the provided product id

The frontend is a Single-Page Application developed with React:
- Home: shows a grid with all products.
- Search results: users are redirected here after performing a full-text search; grid of products similar to Home.
- Product details: users are redirected here after selecting a product; shows product description and 'Add to cart' button
- Cart: shows list of products in user's cart with 'Remove' buttons
- Login: not logged-in users are redirected here if they try to add a product to the cart

The website is localized in English and Portuguese and copy is stored in JSON files in a S3 bucket.

I may implement the following features/improvments:
- [ ] Implement recommendation service
- [ ] Implement quantity in cart items
- [ ] Do not return total hits when searching products
- [ ] Get product by id from the backend when it's not in products array
- [ ] Refresh token if expired
- [ ] Add unit tests
- [ ] Add lambda layer to reduce code duplication

## Deploy via SAM CLI
Install [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) (no need to install docker). Export your AWS credentials:
```bash
$ export AWS_ACCESS_KEY_ID=<YOUR-ACCESS-KEY-ID>
$ export AWS_SECRET_ACCESS_KEY=<YOUR-SECRET-KEY>
```

From the project root folder, run the following commands to build and deploy:
```bash
$ sam build
$ sam deploy --guided
```

### Upload Localization to S3 bucket
In the S3 bucket created by SAM, create a folder named `localization` and upload the files from `localization/data`.

### Load CatalogDb
In `catalog/scripts/data/products.bulk` there are 47 products, including headsets, keyboards, mouses, laptops, TVs and office chairs. All the images are free icons from [Flaticon](https://www.flaticon.com).

To add those products to CatalogDB, export the required environment variables and run the load-db script (also need to export AWS credentials):
```bash
$ export AWS_REGION=<YOUR_AWS_REGION>
$ export CATALOG_DB_DOMAIN=<YOUR_CATALOG_DB_DOMAIN (without 'https://')>
$ cd catalog/scripts
$ node load-db.js
```

---
In the following sections I added instructions for local testing and manual deployment to serve as a guide to my future self and anyone learning about serverless development.

## Manual setup
Create the following:
- A DynamoDB table (DynamoDB -> Tables -> Create) called "cart-db" with partition key "username" (string) and sort key "product_id" (string)
- An OpenSearch domain: version 7.10, instance type t2.small.search or t3.small.search (both are in free tier)
- A Cognito pool: username attributes email
- A S3 bucket with a folder named `localization`; upload the files from `localization/data` into that folder

Export some environment variables:
```bash
$ export AWS_REGION=<YOUR_AWS_REGION>
$ export CATALOG_DB_DOMAIN=<YOUR_CATALOG_DB_DOMAIN (without 'https://')>
$ export COGNITO_POOL_ID=<YOUR_COGNITO_POOL_ID>
$ export COGNITO_CLIENT_ID=<YOUR_COGNITO_CLIENT_ID>
$ export LOCALIZATION_BUCKET=<YOUR_S3_BUCKET_NAME>
```

Export your AWS credentials:
```bash
$ export AWS_ACCESS_KEY_ID=<YOUR-ACCESS-KEY-ID>
$ export AWS_SECRET_ACCESS_KEY=<YOUR-SECRET-KEY>
```

Load CatalogDB with some data:
```bash
$ node catalog/load-db.js
```

## Local testing
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
$ node -e 'require("./cart/get-cart/index.js").handler({"requestContext":{"authorizer":{"claims":{"cognito:username":"<USER>"}}}},{"awsRequestId":"local-test"},console.log)'
```

Add product to cart:
```bash
$ node -e 'require("./cart/add-to-cart/index.js").handler({"pathParameters":{"id":"1"},"body":"{\"id\":\"1\",\"name\":\"some name\",\"description\":\"some description\",\"image_url\":\"some url\",\"price\":123.4}","requestContext":{"authorizer":{"claims":{"cognito:username":"<USER>"}}}},{"awsRequestId":"local-test"},console.log)'
```

Remove product from cart:
```bash
$ node -e 'require("./cart/remove-from-cart/index.js").handler({"pathParameters":{"id":"1"},"requestContext":{"authorizer":{"claims":{"cognito:username":"<USER>"}}}},{"awsRequestId":"local-test"},console.log)'
```

Delete cart:
```bash
$ node -e 'require("./cart/delete-cart/index.js").handler({"requestContext":{"authorizer":{"claims":{"cognito:username":"<USER>"}}}},{"awsRequestId":"local-test"},console.log)'
```

Get copy:
```bash
$ node -e 'require("./localization/get-copy/index.js").handler({"queryStringParameters":{"lang":"en"}},{"awsRequestId":"local-test"},console.log)'
```

## Manual deploy
First we need to create policies and roles to grant our lambdas permission to perform actions against DynamoDb, OpenSearch, S3 and CloudWatch.
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
                "s3:GetObject",
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

Recursively zip everything inside each function folder, including `node_modules`. Example (linux):
```bash
$ cd catalog/search-products
$ npm i
$ zip -r search-products.zip .
```
Repeat the above for: `cart/add-to-cart`, `cart/delete-cart`, `cart/get-cart`, `cart/remove-from-cart`, and `localization/get-copy`.

Create Lambda functions (Lambda -> Functions -> Create function) with runtime "Node.js 16.x"; in permission chose the role you created. Upload the zip files.
You can test your lambdas using the events under `./events`.

Create a REST API with API Gateway (API Gateway -> Create API -> Rest API -> Build). Create three resources, `/catalog`, `/cart` and `/localization/`, with CORS enabled. Inside `/cart` create a resource `/{id}`, also with CORS enabled. Create the following methods with integration type "Lambda Function" and using Lambda Proxy integration:

Resource     | HTTP method | Lambda function
-------------|-------------| ---------------
catalog/     | GET         | search-products
cart/        | GET         | get-cart
cart/        | DELETE      | delete-cart
cart/{id}    | POST        | add-to-cart
cart/{id}    | PUT         | remove-from-cart
localization | GET         | get-copy

On the left panel, click "Authorizers" and create a new authorizer of type "Cognito", token source "Authorization" and attach your Cognito user pool.

Edit all your cart methods (under "Resources" click on the method and then click "Method Request") to add authorization. You can also edit the `POST /cart/{id}` method to add request body with content type `application/json` and edit the `GET /catalog` method to add query string parameters `size`, `page` and `q`.

Deploy your API (Actions -> Deploy API)

## Testing with cURL
After the services are deployed to AWS, you can send requests with cURL.

To obtain an `ID_TOKEN`, run the login script (if you need to create an user, before login run the create-user script, then go to Cognito, select the user, click Actions and Confirm account):
```bash
$ export COGNITO_POOL_ID=<YOUR_COGNITO_POOL_ID>
$ export COGNITO_CLIENT_ID=<YOUR_COGNITO_CLIENT_ID>
$ node -e 'require("./user/scripts/create-user.js").handler("<USER>","<PASSWORD>")'
$ node -e 'require("./user/scripts/login.js").handler("<USER>","<PASSWORD>")'
```

If you deployed via SAM CLI, you'll need to add the header `-H "x-api-key: <API_KEY>"` to every request. To obtain the API key, go to API Gateway, select your API, go to API Keys, click the key and then clikc Show key.

Search products:
```bash
$ curl '<API_GATEWAY_URL>/catalog?q=rgb%20intel%20water%20proof' -H "x-api-key: <API_KEY>"
```

Get cart:
```bash
$ curl '<API_GATEWAY_URL>/cart' -H 'Authorization: <ID_TOKEN>' -H "x-api-key: <API_KEY>"
```

Add to cart:
```bash
$ curl -X POST '<API_GATEWAY_URL>/cart/1' -d '{"id":"1","name":"some name","description":"some description","image_url":"some url","price":124}' -H 'Content-Type: application/json' -H 'Authorization: <ID_TOKEN>' -H "x-api-key: <API_KEY>"
```

Remove from cart:
```bash
$ curl -X PUT '<API_GATEWAY_URL>/cart/1' -H 'Authorization: <ID_TOKEN>' -H "x-api-key: <API_KEY>"
```

Delete cart:
```bash
$ curl -X DELETE '<API_GATEWAY_URL>/cart' -H 'Authorization: <ID_TOKEN>' -H "x-api-key: <API_KEY>"
```

Get copy:
```bash
$ curl '<API_GATEWAY_URL>/localization?lang=pt' -H "x-api-key: <API_KEY>"
```

## Testing the frontend
Run the react app with `npm start` passing the required environment variables:
```bash
$ cd frontend
$ REACT_APP_API_GATEWAY_URL=<API_GATEWAY_URL> REACT_APP_API_KEY=<API_KEY> REACT_APP_COGNITO_POOL_ID=<COGNITO_POOL_ID> REACT_APP_COGNITO_CLIENT_ID=<COGNITO_CLIENT_ID> npm start
```

You can also test the frontend using mocked services (no need to deploy the lambda functions or create any other resources). In order to do so, substitute every occurence of `services/` for `services/mocks/` and run the application with `npm start`.
