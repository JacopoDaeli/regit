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
  const foo = db.collection('foo')

  // Define a callback function to call
  // when insertOne is completed
  const insertOneCb = (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  }

  // Insert element in foo collection
  foo.insertOne({
    foo: 'bar',
    isCool: true
  }, insertOneCb)

  // Insert another element in foo collection
  foo.insertOne({
    foo: 'bar',
    isCool: false
  }, insertOneCb)

  // Create beep collection and insert an element
  const beep = db.collection('beep')
  beep.insertOne({
    beep: 'boop',
    isAwesome: true
  }, insertOneCb)
})
