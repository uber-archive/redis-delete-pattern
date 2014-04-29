// Create a redis client
var redis = require('redis');
var redisDeletePattern = require('../');
var client = redis.createClient();

// Set up some data (pattern `model-{{id}}` in cache)
client.set('model-1234', 'hello');
client.set('model-5678', 'world');

// Fetch some data
client.get('model-1234', console.log); // null, 'hello'
client.get('model-5678', console.log); // null, 'world'

// Delete cached model data
redisDeletePattern({
  redis: client,
  pattern: 'model-*'
}, function handleError (err) {
  // Fetch our keys but find nothing
  client.get('model-1234', console.log); // null, null
  client.get('model-5678', console.log); // null, null
});