// Load in dependencies
var expect = require('chai').expect;
var redisUtils = require('./utils/redis');
var redisDeletePattern = require('../');

// Start tests
describe('A redis client', function () {
  redisUtils.start();

  describe('deleting multiple keys via a pattern', function () {
    redisUtils.set('multi1', 'hai');
    redisUtils.set('multi2', 'hai');

    describe('the first key', function () {
      it('is deleted', function () {

      });
    });
    describe('the second key', function () {
      it('is deleted', function () {

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
