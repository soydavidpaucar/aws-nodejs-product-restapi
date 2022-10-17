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
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
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
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product.Item),
  };
};