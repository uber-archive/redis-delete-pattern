# redis-delete-pattern [![Build status](https://travis-ci.org/uber/redis-delete-pattern.png?branch=master)](https://travis-ci.org/uber/redis-delete-pattern)

Delete a set of keys from a pattern in [Redis][]

[Redis]: http://redis.io/

This was built to make removing a set of cached related items possible in one fell swoop.

## Getting Started
Install the module with: `npm install redis-delete-pattern`

```js
// Create a redis client
var redis = require('redis');
var redisDeletePattern = require('redis-delete-pattern');
var client = redis.createClient();

// Set up some data (pattern `model-{{id}}` in cache)
client.set('model-1234', 'hello');
client.set('model-5678', 'world');

// Fetch some data
client.get('model-1234', console.log); // null, 'hello'
client.get('model-5678', console.log); // null, 'world'

// Delete cached model data
redisDeletePattern({
  redis: redis,
  pattern: 'model-*'
}, function handleError (err) {
  // Fetch our keys but find nothing
  client.get('model-1234', console.log); // null, null
  client.get('model-5678', console.log); // null, null
});
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2014 Uber Technologies, Inc.

Licensed under the MIT license.
