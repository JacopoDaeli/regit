'use strict'

const RegitClient = require('..').RegitClient
const config = require('./config')
const client = new RegitClient()

client.connect(config, (err, db) => {
  if (err) return console.error(err)

  // Print some database info
  console.log(`Connected to db ${config.repo}.`)
  console.log(`Current sha ${db.sha}.`)

  // Create foo collection
  const colors = db.collection('colors')

  // Define a callback function to call
  // when insertMany is completed
  const insertManyCb = (err, results) => {
    if (err) console.error(err)
    else console.log(results)
  }

  // Insert element in foo collection
  colors.insertMany([{
    color: 'red',
    isRed: true
  }, {
    color: 'yellow',
    isRed: false
  }], insertManyCb)
})
