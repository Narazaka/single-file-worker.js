if (typeof Worker !== 'undefined') {

  var workerCode = "self.addEventListener('message', function(event) {self.postMessage(event.data + 1)});";

  var runWorker;

  function clientRoutine(workerMaker) {
    runWorker = function() {
      return new Promise(function(resolve, reject) {
        var worker = workerMaker();
        worker.addEventListener('message', function(event) {
          resolve(event.data);
        });
        worker.postMessage(1);
      });
    }
  }

  SingleFileWorker.webworker(workerCode, clientRoutine);

  describe('SingleFileWorker.webworker', function() {
    it('works', function() {
      runWorker().then(function(data) {
        assert(data === 2);
      });
    });
  });
}
