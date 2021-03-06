'use strict'

const request = require('request')

exports.polyfillRepo = function polyfillRepo (db, repo) {
  const baseUrl = 'https://api.github.com/repos'
  const defaultHeaders = {
    'User-Agent': 'regit/0.0.1 terminal/0.0',
    'Authorization': `token ${db._token}`
  }

  // Polyfill squash function
  repo.squash = (prNumber, sha, cb) => {
    // PUT /repos/:owner/:repo/pulls/:number/merge
    request({
      uri: `${baseUrl}/${db._owner}/${db._repo}/pulls/${prNumber}/merge`,
      method: 'PUT',
      body: JSON.stringify({ merge_method: 'squash', sha }),
      headers: Object.assign({}, defaultHeaders)
    }, (err, resp, body) => {
      if (err) cb(err)
      else exports.errorHandle(resp, body, cb)
    })
  }
  // Polyfill delete branch function
  repo.deleteBranch = (branchName, cb) => {
    // DELETE /repos/:owner/:repo/git/refs/:ref
    request({
      uri: `${baseUrl}/${db._owner}/${db._repo}/git/refs/heads/${branchName}`,
      method: 'DELETE',
      headers: Object.assign({}, defaultHeaders)
    }, (err, resp, body) => {
      if (err) cb(err)
      else exports.errorHandle(resp, body, cb)
    })
  }
}

exports.errorHandle = function errorHandle (res, body, cb) {
  if (Math.floor(res.statusCode / 100) === 5) {
    return cb(new Error(`HTTP Error ${res.statusCode}`))
  }
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}')
    } catch (e) {
      return cb(e)
    }
  }
  const clientHttpErrors = [400, 401, 403, 404, 405, 409, 410, 422]
  if (body.message && clientHttpErrors.indexOf(res.statusCode) > -1) {
    return cb(new Error(`${res.statusCode} ${body.message}`))
  }
  cb(null, body)
}
