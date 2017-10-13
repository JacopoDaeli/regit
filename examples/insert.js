'use strict'

const RegitClient = require('..').RegitClient
const config = require('./config')
const client = new RegitClient()

client.connect(config, (err, db) => {
  if (err) return console.error(err)

  console.log(`Connected to db ${config.repo}.`)

  const foo = db.collection('foo')
  foo.insertOne({
    foo: 'bar',
    isCool: true
  }, (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  })

  foo.insertOne({
    foo: 'bar',
    isCool: false
  }, (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  })

  const beep = db.collection('beep')
  beep.insertOne({
    beep: 'boop',
    isAwesome: true
  }, (err, item, id) => {
    if (err) console.error(err)
    else console.log(item, id)
  })
})
