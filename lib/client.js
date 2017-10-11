'use strict'

const DB = require('./db')

class Client {
  connect (options, cb) {
    const db = new DB(options)
    db.connect(cb)
  }
}

module.exports = Client
