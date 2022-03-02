# README
This is the final project of my specialization on Distributed Software Architecture.
bShop is an e-commerce system developed for academic purposes. The diagram below shows the proposed architecture:

![architecture](./architecture.png)

## Local test
Export your credentials:
```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
```

Load CatalogDB with dummy data (`catalog/data/products.bulk`):
```bash
node load-db.js
```

Searching for products:
```bash
node -e 'require("./search-products.js").handler({"body":"{\"text\":\"RGB water asdf Intel\"}"})'
```

Get cart:
```bash
node -e 'require("./cart/get-cart.js").handler({"body":"{\"user\":\"bruna@gmail.com\"}"})'
```

## cURL
Get cart:
```bash
curl 'https://7pz60grmkj.execute-api.us-east-1.amazonaws.com/test/cart' -H 'Authorization: <ID_TOKEN>'
```

Add to cart:
```bash
curl -X POST 'https://7pz60grmkj.execute-api.us-east-1.amazonaws.com/test/cart' -d '{"product":{"id":"2","name":"another name","description":"another description","image_url":"another url","price":124}}' -H 'Content-type: application/json' -H 'Authorization: <ID_TOKEN>'
```