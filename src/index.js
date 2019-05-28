const Bundler = require('parcel-bundler')
const jsonServer = require('json-server')

const start = (application, db, port) => {
  const options = {}
  const bundler = new Bundler(application, options)

  const server = jsonServer.create()
  const router = jsonServer.router(db)
  const middlewares = jsonServer.defaults()

  // TODO add json-server-reset middleware

  const bundlerMiddleware = bundler.middleware()

  server.use((req, res, next) => {
    if (req.path === '/todos') {
      // data request, continue to JSON server
      return next()
    }

    console.log('request for parcel %s %s', req.method, req.path)
    return bundlerMiddleware(req, res, next)
  })

  server.use(middlewares)
  server.use(router)
  server.listen(port, () => {
    console.log('JSON Server is running at port %d', port)
  })
}

module.exports = {
  start
}
