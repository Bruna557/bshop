# Concepts

## Serverless Design Principles

- **Single Purpose**: Your functions should be concise, short, simple, and follow the Single Responsibility Principle.
- **State Machines for Orchestration**: Chaining Lambda executions within the code to orchestrate the workflow of your application results in a monolithic and tightly coupled application. Instead, use a state machine to orchestrate transactions and communication flows.
- **Use events to trigger transactions**: Events allow for transaction execution in response to business functionalities and are often consumer agnostic.
- **Share nothing**: Function runtime environment and underlying infrastructure are short-lived, therefore local resources such as temporary storage are not guaranteed.
- **Design for failures and duplicates**: Failures can occur and a given request/event can be delivered more than once. Idempotency refers to the capacity of an application or component to identify repeated events and prevent duplicated, inconsistent, or lost data. Making your function idempotent requires designing your function logic to treat duplicated events correctly.

## AWS SAM

In order to do Infrastructure as Code on AWS, you start by writing a specification that defines the infrastructure you require. This specification is provided to AWS through AWS CloudFormation, which then spins up the underlying services for you.

AWS SAM (Serverless Application Model) is an extension of CloudFormation that simplifies the development of serverless applications. It is an open-source framework that provides the following:

- Template specification: You can write a template file that describes all the functions, APIs, permissions, configurations, and events that make up your serverless application. This allows you to operate on a single, deployable, versioned entity.
- CLI: Provides commands that enable you to invoke Lambda functions locally, step-through debug Lambda functions, package and deploy serverless applications to the AWS Cloud, and so on.

## AWS OpenSearch

OpenSearch is a distributed search and analytics engine. OpenSearch organizes data into *indices*. Each index is a collection of JSON *documents*. When you add the document to an index, OpenSearch adds some metadata (the document itself is in the _source object):

```json
{
  "_index": "<index-name>",
  "_type": "_doc",
  "_id": "<document-id>",
  "_version": 1,
  "_source": {
    "title": "The Wind Rises",
    "release_date": "2013-07-20"
  }
}
```

You interact with OpenSearch clusters using the REST API. To add a JSON document to an OpenSearch index (i.e. index a document), you can send an HTTP request to the index API:

```
PUT https://<host>:<port>/<index-name>/_doc/<document-id>
{
  "title": "The Wind Rises",
  "release_date": "2013-07-20"
}
```

To run a search for the document:

```
GET https://<host>:<port>/<index-name>/_search?q=wind
```

To insert multiple documents, you can use the `_bulk` API. A request to the `_bulk` API looks a little different, because you specify the index name and the document ID in the bulk data:

```
POST https://<host>:<port>/_bulk
{ "index": { "_index": "<index-name>", "_id": "<document-id>" } }
{ "A JSON": "document" }
```

If any one of the actions in the `_bulk` API fail, OpenSearch continues to execute the other actions. Examine the `items` array in the response to figure out what went wrong.

OpenSearch automatically creates an index when you add a document to an index that doesn’t already exist. It also automatically generates an ID if you don’t specify an ID in the request. This simple example automatically creates the movies index, indexes the document, and assigns it a unique ID:

```
POST https://<host>:<port>/movies/_doc
{ "title": "Spirited Away" }
```

> - POST: used to achieve auto-generation of ids.
> - PUT: used when you want to specify an id. For some reason, I ran into errors when using PUT for bulk insert, so I'm using POST instead.

Automatic ID generation has a clear downside: because the indexing request didn’t specify a document ID, you can’t easily update the document at a later time. Also, if you run this request 10 times, OpenSearch indexes this document as 10 different documents with unique IDs. When you specify an ID, if you run the insert command 10 times, you still have just one document indexed with the `_version` field incremented to 10.

OpenSearch indices have the following naming restrictions:

- All letters must be lowercase.
- Index names can’t begin with underscores (`_`) or hyphens (`-`).
- Index names can’t contain spaces, commas, or the following characters: `:`, `"`, `*`, `+`, `/`, `\`, `|`, `?`, `#`, `>`, or `<`

## AWS SDK
The AWS SDK for JavaScript provides a JavaScript API for AWS services.
Version 2 of the SDK required you to use the entire AWS SDK. In V3, you can load and use only the individual AWS Services you need. Not only can you load and use individual AWS services, but you can also load and use only the service commands you need.

```javascript
import {
  DynamoDBClient,
  ListTablesCommand
} from @aws-sdk/client-dynamodb"
```

Examples:
- [DynamoDB client documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)
- [DynamoDB client examples](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html)

## Setup

You will need to create an AWS account, create an IAM  (AWS Identity Acess Management) user with administrator privileges and generate credentials. SAM uses the AWS Command Line Interface (CLI) behind the scenes to deploy the project, so you need to install  AWS CLI and configure it to use the credentials from your AWS account. After that, you can install SAM CLI.

## References
[AWS Documentation](https://docs.aws.amazon.com/)
