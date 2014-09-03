karma-commonjs-require
===

Used for testing projects build with [Brunch](http://brunch.io/) build tool which uses [Common.js require](https://github.com/brunch/commonjs-require-definition). It is useful to generate [coverage](https://github.com/karma-runner/karma-coverage) for source files.

Configuration
---

```javascript

    module.exports = function(config) {
      config.set({

    ................

        plugins: [
          'karma-mocha',
          'karma-phantomjs-launcher',
          'karma-coverage',
          // add plugin
          'karma-commonjs-require'
        ],

    // add to frameworks list
    frameworks: ['mocha', 'common-require'],

    // You can define custom application root directories, defaults to ['app']
    commonRequirePreprocessor: {
      appDirs: ['app', 'vendor/assets/javascripts']
    },

    preprocessors: {
      'app/**/*.js' : ['common-require'],
      'test/**/*.js' : ['common-require']
    }

    ...............

      });
    };

```
