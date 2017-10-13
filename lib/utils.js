'use strict'

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
  const clientHttpErrors = [400, 401, 403, 404, 409, 410, 422]
  if (body.message && clientHttpErrors.indexOf(res.statusCode) > -1) {
    return cb(new Error(`${res.statusCode} ${body.message}`))
  }
  cb(null, body)
}
