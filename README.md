<h1 align="center">AWS & Node.js REST Api</h1>

<p align="center">This project was created to continue learning about how to implement a rest api with AWS & Node.js with Typescript</p>

## Links

- [Repo](https://github.com/soydavidpaucar/aws-nodejs-product-restapi "GitHub Repo")

## Endpoints

Regarding security & limitations options I can't provide the real endpoints url's, but you can check the code to see how
it works locally.

## Built With

- AWS Lambda
- DynamoDB
- Node.js
- Typescript
- Serverless Framework
- SLS Offline
- REST Api Design Principles

## Run Locally

Clone the project

```bash
  git clone https://github.com/soydavidpaucar/aws-nodejs-product-restapi.git
```

Go to the project directory

```bash
  cd aws-nodejs-product-restapi
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  sls offline start
```

If you don't have sls installed globally, you can use npx

```bash
  yarn sls offline start
```

Do a request to the following endpoints

| Verb   | Ednpoint                            |
|--------|-------------------------------------|
| Get    | http://localhost:3000/products      |
| Get    | http://localhost:3000/products/{id} |
| Post   | http://localhost:3000/products      |
| Put    | http://localhost:3000/products/{id} |
| Delete | http://localhost:3000/products/{id} |

## Author

**David Paucar**

- [Profile](https://github.com/soydavidpaucar "David Paucar")
- [Email](mailto:soydavidpaucar@gmail.com "Hi!")

## License

This project is open source and available under the [GPL-3.0](LICENSE).