// Load in dependencies
var spawn = require('child_process').spawn;
var redis = require('redis');

// Utility method for create a redis client
exports.createClient = function () {
  // Connect a client
  before(function createClient () {
    this.redis = redis.createClient(9001);
  });

  // Teardown client and server
  after(function exitClient (done) {
    if (this.redis.connected) {
      this.redis.quit(done);
    } else {
      process.nextTick(done);
    }
    delete this.redis;
  });
};

// Convenience methods for interacting with the client
exports.client = {
  set: function (key, val) {
    before(function setValue (done) {
      this.redis.set(key, val, done);
    });
  },
  get: function (key) {
    before(function getValue (done) {
      var that = this;
      this.redis.get(key, function handleValue (err, val) {
        that.val = val;
        done(err);
      });
    });
    after(function cleanupGetValue () {
      delete this.val;
    });
  }
};

// Utility to stat a server and a redis client
// DEV: We must teardown the client before the server stops to prevent errors
exports.run = function () {
  // Start a server
  var server;
  before(function startServer (done) {
    // Start a server at 9001, callback when it is listening
    server = spawn('redis-server', ['--port', '9001']);
    server.stdout.once('data', function handleServerListen (buff) {
      setTimeout(done, 100);
    });

    // Collect output in case the server terminates prematurely
    var output = '';
    server.stdout.on('data', function collectOutput (buff) {
      output += buff;
    });
    server.on('exit', function (code) {
      console.error('Unpredicted redis exit. Code: ' + code + '. Output: ' + output);
    });
  });

  // Startup/teardown a client
  exports.createClient();

  // Teardown the server
  after(function stopServer (done) {
    // Kill the server and callback when dead
    server.removeAllListeners('exit');
    server.on('exit', function (code) {
      done();
    });
    server.kill();
  });
};
