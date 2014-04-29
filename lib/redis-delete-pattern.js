// Load in dependencies
var assert = require('assert');

// Define our module
function redisDeletePattern(params, cb) {
  var redis = params.redis;
  assert(redis, '`redisDeletePattern` requires `params.redis` to interact with redis via but none was found');
  var pattern = params.pattern;
  assert(pattern, '`redisDeletePattern` requires `params.pattern` to resolve keys via but none was found');

  // Get its keys
  redis.keys(pattern, function handleKeys (err, keys) {
    // If there was an error, callback with it
    if (err) {
      return cb(err);
    }

    // If there are keys, delete then
    if (keys.length) {
      // DEV: There is a bit of a delay between get/delete but it is unavoidable
      redis.del(keys, cb);
    // Otherwise, return immediately (we are already async)
    } else {
      cb(null);
    }
  });
}

module.exports = redisDeletePattern;