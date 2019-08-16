# @bahmutov/parcel-json-server

> Combination of [ParcelJs bundler][parcel] and [json-server][json-server]

[![NPM][npm-icon] ][npm-url]

[![CircleCI](https://circleci.com/gh/bahmutov/parcel-json-server.svg?style=svg)](https://circleci.com/gh/bahmutov/parcel-json-server)
[![semantic-release][semantic-image] ][semantic-url]
[![renovate-app badge][renovate-badge]][renovate-app]

## Install

Requires Node 10+ because of ParcelJS bundler

```shell
npm i -D @bahmutov/parcel-json-server
```

## Use

- create a JSON file to server as a database / REST api, see [json-server][json-server] documentation. For example see [test/data.json](test/data.json)
- have an HTML with JavaScript, CSS, etc. for [Parcel][parcel] bundler to process and serve, for example see [test/app/index.html](test/app/index.html)
- run `parcel-json-server --entrypoint <path to HTML file> --database <path to JSON file>` and get the app running at `localhost:<port>` with REST endpoints at `localhost:<port>/<resource name>`

### Options

```text
$ node ./src/cli.js --help
  Usage: cli.js [options] [command]

  Commands:
    help     Display help
    version  Display version

  Options:
    -d, --database    database JSON filename
    -e, --entrypoint  HTML filename to serve
    -h, --help        Output usage information
    -p, --port <n>    Port to run on (defaults to 3000)
    -v, --version     Output the version number
```

### Example

In this repo the example `npm start` script runs

```
$ @bahmutov/parcel-json-server \
    --port 3000 \
    --entrypoint test/app/index.html \
    --database test/data.json
```

Then I can open `localhost:3000` and see the application, and make calls to `localhost:3000/todos` (full REST endpoint)

To reset data, use `POST /reset` request, pass new data to overwrite ALL old data.
For example, from a Cypress test [cypress/integration/spec.js](cypress/integration/spec.js) you can do the following

```js
const todos = require('../../test/data.json').todos

it('responds from REST API', () => {
  cy.request('POST', '/reset', { todos })
  cy.request('/todos')
    .its('body')
    .should('deep.equal', todos)
})
```

### Debugging

If you want to see debug messages, run with environment variable

```
DEBUG=@bahmutov/parcel-json-server
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2019

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/parcel-json-server/issues) on Github

## MIT License

Copyright (c) 2019 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/@bahmutov/parcel-json-server.svg?downloads=true
[npm-url]: https://npmjs.org/package/@bahmutov/parcel-json-server
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

[parcel]: https://parceljs.org
[json-server]: https://github.com/typicode/json-server
