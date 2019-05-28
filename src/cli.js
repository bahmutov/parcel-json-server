#!/usr/bin/env node

// TODO grab filenames from CLI arguments
const path = require('path')
const testFolder = path.join(__dirname, '..', 'test')
const application = path.join(testFolder, 'app', 'index.html')
const db = path.join(testFolder, 'data.json')

const { start } = require('.')
start(application, db, process.env.PORT || 3000)
