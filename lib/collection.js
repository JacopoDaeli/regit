'use strict'

const hat = require('hat')
// const atob = require('atob')
// const btoa = require('btoa')

class Collection {
  constructor (db, name) {
    this._db = db
    this.name = name
  }

  _persist () {

  }

  insert () {

  }

  find () {

  }

  insertOne (item, done) {
    const ghrepo = this._db.ghrepo
    const id = `${hat()}.json`
    const msg = `Inserting ${id}`
    const cb = (err, result) => {
      if (err) done(err)
      else done(null, item)
    }
    ghrepo.createContents(id, msg, JSON.stringify(item), this.name, cb)
  }

  findOne () {

  }
}

module.exports = Collection
