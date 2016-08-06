if (typeof require !== 'undefined') {
  var assert = require('power-assert');

  var fork = require('./workers/fork');

  describe('SingleFileWorker.fork', function() {
    it('works', function() {
      return fork().then(function(message) {
        assert(message === 2);
      });
    });
  });
}
