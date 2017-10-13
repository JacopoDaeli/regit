'use strict'

const octonode = require('octonode')
const request = require('request')

const Collection = require('./collection')
const utils = require('./utils')

class DB {
  constructor (options) {
    this._token = options.token
    this._owner = options.username || options.org
    this._isOrg = !!options.org
    this._repo = options.repo
    this._octonode = octonode.client(options.token)
  }

  get sha () {
    return this._baseSha
  }

  get ghowner () {
    return this._isOrg ?
      this._octonode.org(this._owner) : this._octonode.me()
  }

  get ghrepo () {
    const repo = this._octonode.repo(`${this._owner}/${this._repo}`)
    const baseUrl = 'https://api.github.com/repos'
    const defaultHeaders = {
      'User-Agent': 'regit/0.0.1 terminal/0.0',
      'Authorization': `token ${this._token}`
    }
    // Polyfill squash function
    repo.squash = (prNumber, sha, cb) => {
      // PUT /repos/:owner/:repo/pulls/:number/merge
      request({
        uri: `${baseUrl}/${this._owner}/${this._repo}/pulls/${prNumber}/merge`,
        method: 'PUT',
        body: JSON.stringify({ merge_method: 'squash', sha }),
        headers: Object.assign({}, defaultHeaders)
      }, (err, resp, body) => {
        if (err) cb(err)
        else utils.errorHandle(resp, body, cb)
      })
    }
    // Polyfill delete branch function
    repo.deleteBranch = (branchName, cb) => {
      // DELETE /repos/:owner/:repo/git/refs/:ref
      request({
        uri: `${baseUrl}/${this._owner}/${this._repo}/git/refs/heads/${branchName}`,
        method: 'DELETE',
        headers:  Object.assign({}, defaultHeaders)
      }, (err, resp, body) => {
        if (err) cb(err)
        else utils.errorHandle(resp, body, cb)
      })
    }
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

  collection (name) {
    return new Collection(this, name)
  }
}

module.exports = DB
