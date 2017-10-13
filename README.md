# regit

A github-powered nosql database inspired by [node-mongodb-native](http://mongodb.github.io/node-mongodb-native/2.0/api/).

## API

### `client.connect(options, callback)`

Connect to a ReGit database. This is a database-like wrapper for a
GitHub repository that treats JSON objects as documents.

```js
client.connect({
  token: 'token',
  username: 'username',
  repo: 'dbname'
}, (err, db) => {
  console.log(db.name) // print "dbname"
})
```

### `db.collections(callback)`

Fetch all collections for the current db.
```js
db.collections((err, collections) => {
  if (err) return console.error(err)
  collections.forEach((collection) => console.log(collections.name))
  // print "[ 'foo' ]"
})
```

### `db.collection(name, callback)`

Fetch a specific collection.
```js
db.collection('foo', (err, collection) => {
  if (err) return console.error(err)
  console.log(collection.name) // print "foo"
})
```

If you do not need to fetch the collection information, you can
also use it without a callback in the following way.
```js
const collection = db.collection('foo')
console.log(collection.name) // print "foo"
```

### `collection.insertMany(items, callback)`

Inserts an array of documents into ReGit. The callback is called
with `(err, results)`.

### `collection.insertOne(item, callback)`

Add a new object to the collection. The callback is called
with `(err, item, id)` where `id` is the id internally chosen
for this new item.

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install regit
```

## Examples

Have a look to the [examples](examples) folder.

## Tests

```sh
$ npm test
```
