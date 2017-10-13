'use strict'

const RegitClient = require('..').RegitClient
const config = require('./config')
const client = new RegitClient()

client.connect(config, (err, db) => {
  if (err) return console.error(err)

  console.log(`Connected to db ${config.repo}.`)
  console.log(`Current sha ${db.sha}.`)

  const repo = db.ghrepo
  const number = 10
  const sha = 'fa4a04899451e2edf91813536ba152bc216c6b88'
  repo.squash(number, sha, (err) => {
    if (err) console.error(err)
    else console.log(`Squashed PR ${number}.`)
  })
})
