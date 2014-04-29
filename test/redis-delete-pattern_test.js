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

  describe.skip('deleting 0 keys via a pattern', function () {
    it('has no issues', function () {

    });
  });
});

// Edge cases for error handling
describe.skip('A redis client talking to a downed server', function () {
  describe('attempting to delete keys via a pattern', function () {
    it('receives an error', function () {

    });
  });
});
