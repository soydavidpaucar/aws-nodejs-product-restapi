import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const requestBody = JSON.parse(event.body as string);

  const product = {
    ...requestBody,
    productId: v4(),
  };

  await docClient.put({
    TableName: "ProductsTable",
    Item: product,
  }).promise();

  if (!product) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Product not created",
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
};

export const getProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productId = event.pathParameters?.id;

  const product = await docClient.get({
    TableName: "ProductsTable",
    Key: {
      productId,
    },
  }).promise();

  if (!product.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Product not found",
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product.Item),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
};

export const updateProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productId = event.pathParameters?.id;
  const requestBody = JSON.parse(event.body as string);

  const product = await docClient.update({
    TableName: "ProductsTable",
    Key: {
      productId,
    },
    UpdateExpression: "SET #name = :name, #description = :description, #price = :price",
    ExpressionAttributeNames: {
      "#name": "name",
      "#description": "description",
      "#price": "price",
    },
    ExpressionAttributeValues: {
      ":name": requestBody.name,
      ":description": requestBody.description,
      ":price": requestBody.price,
    },
    ReturnValues: "UPDATED_NEW",
  }).promise();

  if (!product.Attributes) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Product not found",
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product.Attributes),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
};