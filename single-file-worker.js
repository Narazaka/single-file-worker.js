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

  fork: function(workerCode, clientRoutine, filename) {
    if (SingleFileWorker.isMainProcess()) { // fork main process / webworker browser process
      clientRoutine(SingleFileWorker.makeForkWorkerMaker(filename));
    } else { // fork child process
      SingleFileWorker.runWorker(workerCode);
    }
  },

  makeForkWorkerMaker: function(filename) {
    var child_process = require('child_process');
    return function() {
      return child_process.fork(filename);
    };
  },

  runWorker: function(workerCode) {
    eval(workerCode);
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
