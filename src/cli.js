#!/usr/bin/env node

const debug = require('debug')('@bahmutov/parcel-json-server')
const args = require('args')
const path = require('path')

const flags = args
  .option('port', 'Port to run on', 3000)
  .option('entrypoint', 'HTML filename to serve')
  .option('database', 'database JSON filename')
  .parse(process.argv)

debug('CLI arguments %o', flags)

const application = path.resolve(flags.entrypoint)
const db = path.resolve(flags.database)

const { start } = require('.')
start(application, db, flags.port)
