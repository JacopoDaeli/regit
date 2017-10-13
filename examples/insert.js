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

  // Insert element in foo collection
  foo.insertOne({
    foo: 'bar',
    isCool: true
  }, (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  })

  // Insert another element in foo collection
  foo.insertOne({
    foo: 'bar',
    isCool: false
  }, (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  })

  // Create beep collection and insert an element
  const beep = db.collection('beep')
  beep.insertOne({
    beep: 'boop',
    isAwesome: true
  }, (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  })
})
