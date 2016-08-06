if (typeof require !== 'undefined') {
  var SingleFileWorker = require('../../single-file-worker.js');

  function workerRoutine() {
    process.on('message', function(message) {process.send(message + 1)});
  }

  function clientRoutine(workerMaker) {
    module.exports = function() {
      return new Promise(function(resolve, reject) {
        var worker = workerMaker();
        worker.on('message', function(message) {
          resolve(message);
        });
        worker.send(1);
      });
    }
  }

  SingleFileWorker.fork(workerRoutine, clientRoutine, SingleFileWorker.scriptFilenameFromError(new Error()));
}
