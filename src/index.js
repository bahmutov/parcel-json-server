const Bundler = require('parcel-bundler')
const jsonServer = require('json-server')
const debug = require('debug')('@bahmutov/parcel-json-server')
const reset = require('json-server-reset')
const setApp = require('json-server-reset/src/set-app')
const bodyParser = require('json-server/lib/server/body-parser')

const start = (application, db, port) => {
  debug('starting parcel-json-server on port %d', port)
  debug('bundling %s', application)
  debug('serving REST API based on %s', db)

  const server = jsonServer.create()
  const router = jsonServer.router(db)
  server.use(setApp(server, router.db))
  server.use(bodyParser)
  server.use(reset)

  const options = {}
  const bundler = new Bundler(application, options)
  const bundlerMiddleware = bundler.middleware()

  server.use((req, res, next) => {
    // TODO determine the path from loaded database resources
    if (req.path === '/todos') {
      // data request, continue to JSON server
      return next()
    }

    debug('request for parcel %s %s', req.method, req.path)
    return bundlerMiddleware(req, res, next)
  })

  server.use(jsonServer.defaults())
  server.use(router)
  server.listen(port, () => {
    console.log('parcel-json-server is running at port %d', port)
  })
}

module.exports = {
  start
}
