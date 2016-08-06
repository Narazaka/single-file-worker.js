var SingleFileWorker = {
  webworker: function(workerCode, clientRoutine) {
    clientRoutine(SingleFileWorker.makeWebWorkerMaker(workerCode));
  },

  makeWebWorkerMaker: function(workerCode) {
    return function() {
      var url = URL.createObjectURL(new Blob([workerCode], {type: 'text/javascript'}));
      var worker = new Worker(url);
      // URL.revokeObjectURL(url);
      return worker;
    };
  },

  fork: function(workerRoutine, clientRoutine, filename) {
    if (SingleFileWorker.isMainProcess()) { // fork main process
      clientRoutine(SingleFileWorker.makeForkWorkerMaker(filename));
    } else { // fork child process
      SingleFileWorker.runWorker(workerRoutine);
    }
  },

  makeForkWorkerMaker: function(filename) {
    var child_process = require('child_process');
    return function() {
      return child_process.fork(filename);
    };
  },

  runWorker: function(workerRoutine) {
    workerRoutine();
  },

  isMainProcess: function() {
    return typeof window !== 'undefined' || (typeof process !== 'undefined' && !process.send);
  },

  scriptFilenameFromError: function(error) {
    var stack = error.stack.toString();
    var result =
      stack.match(/Error\s*at .*? \((.*?):\d+(?::\d+)?\)/) || // node.js / IE / Edge / Chrome not top level
      stack.match(/Error\s*at (\S*?):\d+\b/) || // Chrome top level
      stack.match(/@(.*?):\d+:\d+\b/); // Firefox
    return result ? result[1] : null;
  },
};

if (typeof module !== 'undefined') module.exports = SingleFileWorker;
if (typeof window !== 'undefined') window.SingleFileWorker = SingleFileWorker;
