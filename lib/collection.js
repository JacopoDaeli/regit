'use strict'

const hat = require('hat')
// const atob = require('atob')
// const btoa = require('btoa')

class Collection {
  constructor (db, name) {
    this._db = db
    this.name = name
  }

  insert () {

  }

  find () {

  }

  _insertOne (item, done) {
    const ghrepo = this._db.ghrepo
    const id = hat()
    const filename = `${id}.json`
    const path = `data/${this.name}/${filename}`
    const msg = `+ ${id}`
    const branchName = `tmp/${id}`

    const squashPrCb = (err) => {
      if (err) return done(err)
      // else done(null, item, id)
      ghrepo.deleteBranch(branchName, (err) => {
        if (err) done(err)
        else done(null, item, id)
      })
    }

    const cbCreatePR = (err, pr) => {
      if (err) done(err)
      else ghrepo.squash(pr.number, pr.head.sha, squashPrCb)
      // else done(null, item, id)
    }

    const cbCreateContents = (err) => {
      if (err) return done(err)
      ghrepo.pr({
        title: `Add ${filename}`,
        body: 'This is an auto-generated PR.',
        head: branchName,
        base: 'master'
      }, cbCreatePR)
    }

    const createRefCb = (err) => {
      if (err) return done(err)
      const data = JSON.stringify(Object.assign({}, item, { _id: id }))
      ghrepo.createContents(path, msg, data, `tmp/${id}`, cbCreateContents)
    }
    ghrepo.createReference(branchName, this._db.sha, createRefCb)
  }

  insertOne (item, done) {
    this._db.insertIntoCollection(this, item, done)
  }

  findOne () {

  }
}

module.exports = Collection
