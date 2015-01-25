module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

    files: [
      'test/features/step_definitions/*.step.js', {
        pattern: 'test/features/*.feature',
        included: false
      }
    ],

    exclude: [],

    browserify: {
      debug: true,
      files: [
        '.tmp/test.spec.js',
        'test/bottle-library.js',
        'test/features/step_definitions/*.step.js'
      ]
    },

    preprocessors: {
      '.tmp/test.spec.js': 'browserify',
      'test/bottle-library.js': 'browserify',
      'test/features/step_definitions/*.step.js': 'browserify'
    },

    reporters: ['mocha', 'progress'],
    port: 9999,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-browserifast',
      'karma-sinon',
      'karma-mocha-reporter'
    ],

    browsers: ['PhantomJS']
  });
};
