// Load in dependencies
var expect = require('chai').expect;
var redisUtils = require('./utils/redis');
var redisDeletePattern = require('../');

// Start tests
describe('A redis client', function () {
  redisUtils.run();

  describe('deleting multiple keys via a pattern', function () {
    redisUtils.client.set('multi1', 'hai');
    redisUtils.client.set('multi2', 'world');
    before(function deleteKeys (done) {
      redisDeletePattern({
        redis: this.redis,
        pattern: 'multi*'
      }, done);
    });

    describe('the first key', function () {
      redisUtils.client.get('multi1');

      it('is deleted', function () {
        expect(this.val).to.equal(null);
      });
    });

    describe('the second key', function () {
      redisUtils.client.get('multi2');

      it('is deleted', function () {
        expect(this.val).to.equal(null);
      });
    });
  });

  describe('deleting 0 keys via a pattern', function () {
    before(function deleteNonexistentKeys (done) {
      var that = this;
      redisDeletePattern({
        redis: this.redis,
        pattern: 'nothingtosee*here'
      }, function saveResult (err) {
        that.err = err;
        done();
      });
    });

    it('has no issues', function () {
      expect(this.err).to.equal(null);
    });
  });
});

// Edge cases for error handling
describe('A redis client talking to a downed server', function () {
  redisUtils.createClient();
  before(function swallowClientErrors () {
    this.redis.on('error', function noop () {});
  });

  describe('attempting to delete keys via a pattern', function () {
    before(function deleteKeys (done) {
      var that = this;
      redisDeletePattern({
        redis: this.redis,
        pattern: 'econnrefused*'
      }, function saveResult (err) {
        that.err = err;
        done();
      });
    });

    it('receives an error', function () {
      expect(this.err).to.not.equal(null);
    });
  });
});
