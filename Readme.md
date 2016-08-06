# [single-file-worker.js](https://github.com/Narazaka/single-file-worker.js)

[![npm](https://img.shields.io/npm/v/single-file-worker.svg)](https://www.npmjs.com/package/single-file-worker)
[![npm license](https://img.shields.io/npm/l/single-file-worker.svg)](https://www.npmjs.com/package/single-file-worker)
[![npm download total](https://img.shields.io/npm/dt/single-file-worker.svg)](https://www.npmjs.com/package/single-file-worker)
[![npm download by month](https://img.shields.io/npm/dm/single-file-worker.svg)](https://www.npmjs.com/package/single-file-worker)
[![Bower](https://img.shields.io/bower/v/single-file-worker.svg)](https://github.com/Narazaka/single-file-worker.js)
[![Bower](https://img.shields.io/bower/l/single-file-worker.svg)](https://github.com/Narazaka/single-file-worker.js)

[![Dependency Status](https://david-dm.org/Narazaka/single-file-worker.js.svg)](https://david-dm.org/Narazaka/single-file-worker.js)
[![devDependency Status](https://david-dm.org/Narazaka/single-file-worker.js/dev-status.svg)](https://david-dm.org/Narazaka/single-file-worker.js#info=devDependencies)
[![Travis Build Status](https://travis-ci.org/Narazaka/single-file-worker.js.svg)](https://travis-ci.org/Narazaka/single-file-worker.js)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/Narazaka/single-file-worker.js?svg=true)](https://ci.appveyor.com/project/Narazaka/single-file-worker-js)
[![Code Climate](https://codeclimate.com/github/Narazaka/single-file-worker.js/badges/gpa.svg)](https://codeclimate.com/github/Narazaka/single-file-worker.js)

This helps to make library that uses WebWorker/fork as one simple file.

## Install

npm:
```
npm install single-file-worker
```

bower:
```
bower install single-file-worker
```

## Usage

fork (node.js / electron / nw.js):
```javascript
var SingleFileWorker = require('single-file-worker');

function workerRoutine() {
  process.on('message', function(message) {process.send(message + 1)});
}

function clientRoutine(workerMaker) {
  var worker = workerMaker();
  worker.on('message', function(message) {
    console.log(message); // 2
  });
  worker.send(1);
}

SingleFileWorker.fork(workerRoutine, clientRoutine, SingleFileWorker.scriptFilenameFromError(new Error()));
```

WebWorker (browsers / electron / nw.js):
```html
<script src="single-file-worker.js"></script>
<script>
var workerCode = "self.addEventListener('message', function(event) {self.postMessage(event.data + 1)});";

var runWorker;

function clientRoutine(workerMaker) {
  var worker = workerMaker();
  worker.addEventListener('message', function(event) {
    console.log(event.data); // 2
  });
  worker.postMessage(1);
}

SingleFileWorker.webworker(workerCode, clientRoutine);
</script>
```

## License

This is released under [MIT License](http://narazaka.net/license/MIT?2016).
