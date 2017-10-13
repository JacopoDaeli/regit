# regit

A github-powered nosql database.

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

### `db.collection(name)`

Create a collection in the database.
```js
const collection = db.collection('foo')
console.log(collection.name) // print "foo"
```

### `collection.list(callback)`

List documents within this database.

### `collection.add(data, callback)`

Add a new object to the collection. If successful, the callback is called
with `(err, item, id)` where `id` is the id internally chosen
for this new item.

### `collection.emove(id, callback)`

Remove an item from the collection given its id and a callback.

### `collection.get(id, callback)`

Get an item from the collection given its id and a callback.

### `collection.update(id, data, callback)`

Update an object in the collection, given its id, new data, and a callback.

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
