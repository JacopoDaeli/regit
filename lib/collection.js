'use strict'

const hat = require('hat')
// const atob = require('atob')
// const btoa = require('btoa')

class Collection {
  constructor (db, name) {
    this._db = db
    this._queue = []
    this._cb = null
    this.name = name
  }

  _persist () {

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
    const cb = (err, item, id) => {
      // console.log(this._queue.length)
      done(err, item, id)
      if (this._queue.length > 0) {
        console.log('shift cb')
        const el = this._queue.shift()
        this._insertOne(el.item, el.cb)
      }
    }

    this._queue.push({ item, cb })

    console.log(this._queue.length)

    if (this._queue.length === 1) {
      process.nextTick(() => {
        console.log('shift')
        const el = this._queue.shift()
        this._insertOne(el.item, el.cb)
      })
    }

    // if (this._queue.length > 0) {
    //   process.nextTick(() => {
    //     const { item, done } = this._queue.shift()
    //     this._insertOne(item, done)
    //   })
    // }
  }

  findOne () {

  }
}

module.exports = Collection
