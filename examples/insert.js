'use strict'

const RegitClient = require('..').RegitClient

const client = new RegitClient()

client.connect({
  token: 'token',
  username: 'username',
  repo: 'repo'
}, (err, db) => {
  if (err) return console.error(err)

  const collection = db.collection('foo')
  collection.insertOne({
    beep: 'boop',
    isCool: true
  }, (err, item) => {
    if (err) console.error(err)
    else console.log(item)
  })
})
