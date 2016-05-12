# flatmarket-service

[![Build Status](https://circleci.com/gh/christophercliff/flatmarket-service.svg?style=shield)](https://circleci.com/gh/christophercliff/flatmarket-service)
[![codecov.io](http://codecov.io/github/christophercliff/flatmarket-service/coverage.svg?branch=master)](http://codecov.io/github/christophercliff/flatmarket-service?branch=master)

The core Flatmarket service. Powers [flatmarket-server](https://github.com/christophercliff/flatmarket-server) and [flatmarket-lambda](https://github.com/christophercliff/flatmarket-lambda).

## Installation

```
npm install flatmarket-service
```

## Usage

```js
var handleRequest = require('flatmarket-service')(yourStripeSecretKey, yourSchemaUri)

handleRequest(payload).then(function (res) {})
```

#### `createHandler()`

##### `createHandler(stripeSecretKey: string, schemaUri: string): (payload: object) => Promise`

The shape of the `payload` object is specified in [lib/validate](https://github.com/christophercliff/flatmarket-service/blob/master/lib/validate.js).

## Contributing

See [CONTRIBUTING](https://github.com/christophercliff/flatmarket/blob/master/CONTRIBUTING.md).

## License

See [LICENSE](https://github.com/christophercliff/flatmarket/blob/master/LICENSE.md).
