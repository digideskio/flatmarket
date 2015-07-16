[![Build Status](https://travis-ci.org/christophercliff/hapi-flatmarket.png?branch=master)](https://travis-ci.org/christophercliff/hapi-flatmarket)

# hapi-flatmarket

> ***[flatmarket](https://github.com/christophercliff/flatmarket)*** is a free and secure e-commerce platform for static websites.<br />By [JSON Expert](https://json.expert/).

A [hapi](http://hapijs.com/) plugin for flatmarket.

## Installation

```
npm install hapi-flatmarket
```

## Usage

```js
var Flatmarket = require('hapi-flatmarket')

server.register({
  register: Flatmarket,
  options: options,
}, function (err) {})
```

### **`options`** `Object`

- **`corsOrigins`** `[String]`

    Sets the [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) for your routes. Default `['*']`.

- **`schemaUri`** `String`

    The URI for the [flatmarket schema](https://github.com/christophercliff/flatmarket-schema). Required.

- **`stripeSecretKey`** `String`

    The [Stripe secret key](https://support.stripe.com/questions/where-do-i-find-my-api-keys). Required.

## Contributing

See [CONTRIBUTING](https://github.com/christophercliff/flatmarket/blob/master/CONTRIBUTING.md).

## License

See [LICENSE](https://github.com/christophercliff/flatmarket/blob/master/LICENSE.md).
