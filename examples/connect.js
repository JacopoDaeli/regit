'use strict'

const RegitClient = require('..').RegitClient
const config = require('./config')
const client = new RegitClient()

client.connect(config, (err, db) => {
  if (err) return console.error(err)

  // Print some database info
  console.log(`Connected to db ${db.name}.`)
  console.log(`Current sha ${db.sha}.`)
})
