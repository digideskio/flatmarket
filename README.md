Made possible By [JSON Expert](https://json.expert/), the easiest way to create a web-ready API.

---

# flatmarket-example

An example [Flatmarket](https://json.expert/flatmarket/) website.

## Usage

Install the dependencies:

```sh
$ npm install
```

Then start the local server in development mode:

```sh
$ ./node_modules/.bin/flatmarket \
    --component ./node_modules/flatmarket-theme-bananas/index.jsx \
    --stripe-secret-key YOUR_TEST_SECRET_KEY \
    --dev
```

The website should be running at [https://127.0.0.1:8000/](https://127.0.0.1:8000/).

## Contributing

See [CONTRIBUTING](https://github.com/christophercliff/flatmarket/blob/master/CONTRIBUTING.md).

## License

See [LICENSE](https://github.com/christophercliff/flatmarket/blob/master/LICENSE.md).
