'use strict'

const octonode = require('octonode')
const Collection = require('./collection')
const utils = require('./utils')

class DB {
  constructor (options) {
    this._token = options.token
    this._owner = options.username || options.org
    this._isOrg = !!options.org
    this._repo = options.repo
    this._octonode = octonode.client(options.token)
    this._queue = []
  }

  get sha () {
    return this._baseSha
  }

  get ghowner () {
    return this._isOrg
      ? this._octonode.org(this._owner) : this._octonode.me()
  }

  get ghrepo () {
    const repo = this._octonode.repo(`${this._owner}/${this._repo}`)
    utils.polyfillRepo(this, repo)
    return repo
  }

  _persist (cb) {
    const createRepoCb = (err) => {
      if (err) return cb(err)
      const data = JSON.stringify({})
      this.ghrepo.createContents('_config', 'init db', data, 'master', cb)
    }
    this.ghowner.repo({ name: this._repo }, createRepoCb)
  }

  insertIntoCollection (collection, item, done) {
    const cb = (err, item, id) => {
      done(err, item, id)
      if (this._queue.length > 0) {
        const el = this._queue.shift()
        el.collection._insertOne(el.item, el.cb)
      }
    }

    this._queue.push({ collection, item, cb })

    if (this._queue.length === 1) {
      process.nextTick(() => {
        const el = this._queue.shift()
        el.collection._insertOne(el.item, el.cb)
      })
    }
  }

  connect (cb) {
    const getBranchCb = (err, branch) => {
      if (err) return cb(err)
      this._baseSha = branch.commit.sha
      cb(null, this)
    }
    const persistCb = (err, result) => {
      if (err) return cb(err)
      else this.ghrepo.branch('master', getBranchCb)
    }
    this.ghrepo.info((err) => {
      if (err && err.statusCode === 404) this._persist(persistCb)
      else if (err) cb(err)
      else this.ghrepo.branch('master', getBranchCb)
    })
  }

  collection (name, cb) {
    if (!cb) return
    cb(null, new Collection(this, name))
  }

  collections () {
    throw new Error('Not implemented')
  }
}

module.exports = DB
