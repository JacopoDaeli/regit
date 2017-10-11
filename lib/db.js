'use strict'

const github = require('octonode')

class DB {
  constructor (options) {
    this._token = options.token
    this._owner = options.username || options.org
    this._isOrg = !!options.org
    this._repo = options.repo
    this._client = github.client(options.token)
    this._isConnected = false
  }

  _persist (cb) {
    const gh = this._isOrg ? this._client.org(this._owner) : this._client.me()
    gh.repo({ name: this._repo }, (err) => {
      if (err) cb(err)
      else cb(null, this)
    });
  }

  connect (cb) {
    const repo = this._client.repo(`${this._owner}/${this._repo}`)
    repo.info((err) => {
      if (err && err.statusCode === 404) this._persist(cb)
      else if (err) cb(err)
      else cb(null, this)
    })
  }

  collection (name) {
    return new Collection(this, name)
  }
}

module.exports = DB
