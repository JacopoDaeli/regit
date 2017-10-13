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
  //
})
```

### `db.showCollections()`

List the the database collections.
```js
const collections = db.collections()
console.log(collections)
// ['foo', 'bar', 'beep', 'boop']
```

### `db.collection(name)`

Create a collection in the database.
```js
const collection = db.collection('foo')
console.log(collection.name) // print "foo"
```

### `collection.insertMany(items, callback)`

Inserts an array of documents into ReGit. The callback is called
with `(err, results)`.

### `collection.insertOne(items, callback)`

Add a new object to the collection. The callback is called
with `(err, item, id)` where `id` is the id internally chosen
for this new item.

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install hubdb
```

## Examples

Have a look to the [examples](examples) folder.

## Tests

```sh
$ npm test
```
