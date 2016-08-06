var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['detectBrowsers', 'mocha'],
    plugins: [
      'karma-mocha',
      'karma-mocha-own-reporter',
      'karma-ie-launcher',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-electron',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-phantomjs-launcher',
      'karma-detect-browsers',
      'karma-espower-preprocessor',
    ],
    files: [
      require.resolve('power-assert/build/power-assert'),
      require.resolve('bluebird/js/browser/bluebird'),
      'single-file-worker.js',
      'test/**/*.js',
    ],
    exclude: ['**/*.swp'],
    preprocessors: {
      'src/**/*.js': ['espower'],
      'test/**/*.js': ['espower'],
    },
    reporters: ['mocha-own'],
    detectBrowsers: {
      postDetection: function(availableBrowsers) {
        const result = availableBrowsers;
        if (process.env.TRAVIS) {
          const chrome_index = availableBrowsers.indexOf('Chrome');
          if (chrome_index >= 0) {
            result.splice(chrome_index, 1);
            result.push('Chrome_travis_ci');
          }
        }
        result.push('Electron');
        return result;
      },
    },
    espowerPreprocessor: {
      transformPath: function(path) { return path.replace(/\.js/, '.espowered.js'); },
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [],
    singleRun: false,
    concurrency: Infinity,
  });
};
