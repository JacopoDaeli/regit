'use strict'

// NOTE: https://github.com/JacopoDaeli/regit-db-example/tree/foo

const RegitClient = require('..').RegitClient

const client = new RegitClient()

client.connect({
  token: 'token',
  username: 'username',
  repo: 'regit-db-example'
}, (err, db) => {
  if (err) return console.error(err)

  const foo = db.collection('foo')
  foo.insertOne({
    foo: 'bar',
    isCool: true
  }, (err, item) => {
    if (err) console.error(err)
    else console.log(item)
  })

  const beep = db.collection('beep')
  beep.insertOne({
    beep: 'boop',
    isAwesome: true
  }, (err, item) => {
    if (err) console.error(err)
    else console.log(item)
  })
})
