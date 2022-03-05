# README
This is the final project of my specialization on Distributed Software Architecture.
bShop is an e-commerce system developed for academic purposes. The diagram below shows the proposed architecture:

![architecture](./architecture.png)

I am not implementing the whole system, only the following services:
- Catalog: products stored in AWS OpenSearch; methods "get all" and "search"
- Cart: users shopping carts stored in AWS DynamoDB (username -> list of products); methods "add to cart", "remove from cart", "get cart" and "delete cart"
- Recommendation: graph database implemented with AWS Neptune where users and products are nodes, while edges represent purchases; method "get recommendation" (when an user selects a product P, look for other products bought by users who also bought P)
- User: users stored in AWS Cognito; method "login"

Each endpoint in the following table was implemented as a serverless function using AWS Lambda. `user` is determined based on the ID_TOKEN provided on the Authorization header.
Endpoint            | HTTP method | Description
--------------------|-------------| -----------
catalog/            | GET         | Get a paginated list of all products on the catalog database
catalog/search      | GET         | Perform a full-text search on the catalog database (including fields `name` and `description`)
cart/               | GET         | Get user's cart
cart/               | POST        | Add product to user's cart
cart/               | DELETE      | Delete user's cart
cart/{id}           | DELETE      | Remove product from user's cart
recommendation/{id} | GET         | Get a list of recommended products
user/login          | POST        | Get ACCESS_TOKEN, ID_TOKEN and REFRESH_TOKEN

The frontend is a Single-Page Application developed with React:
- Home: shows a grid with all products.
- Search results: users are redirected here after performing a full-text search; grid of products similar to Home.
- Product: users are redirected here after selecting a product; shows product description, 'Add to cart' button and a list of recommended products
- Cart: shows list of products in user's cart with 'Remove' buttons
- Login: not logged-in users are redirected here if they try to add a product to cart

## Local testing
Export your AWS credentials:
```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
```

Load CatalogDB with dummy data (`catalog/data/products.bulk`):
```bash
node catalog/load-db.js
```

Searching for products:
```bash
node -e 'require("./catalog/search-products.js").handler({"body":"{\"text\":\"RGB water asdf Intel\"}"})'
```

Get cart:
```bash
node -e 'require("./cart/get-cart.js").handler({"body":"{\"user\":\"bruna@gmail.com\"}"})'
```

## Testing with cURL
After the services are deployed to AWS, you can send requests with cURL.
Get cart:
```bash
curl 'https://7pz60grmkj.execute-api.us-east-1.amazonaws.com/test/cart' -H 'Authorization: <ID_TOKEN>'
```

Add to cart:
```bash
curl -X POST 'https://7pz60grmkj.execute-api.us-east-1.amazonaws.com/test/cart' -d '{"product":{"id":"2","name":"another name","description":"another description","image_url":"another url","price":124}}' -H 'Content-type: application/json' -H 'Authorization: <ID_TOKEN>'
```

Searching for products:
```bash
curl 'https://7pz60grmkj.execute-api.us-east-1.amazonaws.com/test/catalog/search?q=rgb%20intel%20water%20proof'
```
