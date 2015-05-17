module.exports = function(config) {
  return config.set({
    basePath: '..',
    frameworks: [
      'mocha',
      'sinon-chai'
    ],
    files: [
      'node_modules/yadda/dist/yadda-0.11.4.js',
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-translate/angular-translate.min.js',
      '.tmp/js/test/*.js',
      '.tmp/js/app/core/models/**/*.js',
      '.tmp/js/app/core/dao/**/*.js',
      '.tmp/js/app/core/modules/**/*.js',
      '.tmp/js/app/core/widgets/**/src/**/*.js',
      '.tmp/js/app/core/widgets/**/*.js',
      '.tmp/js/app/widgets/**/src/**/*.js',
      '.tmp/js/app/widgets/**/*.js',
      '.tmp/js/app/app.js',
      '.tmp/js/templates.js',
      '.tmp/js/app/core/widgets/**/test/unit/*.js',
      '.tmp/js/app/widgets/**/test/unit/*.js',
      '.tmp/test.spec.js'
    ],
    exclude: [],
    port: 5050,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: false,
    browsers: ['PhantomJS'],
    reporters: [
      'mocha',
      'coverage'
    ],
    preprocessors: {
      '.tmp/js/widgets/**/*.js': ['coverage'],
      '.tmp/js/core/**/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
      subdir: '.'
    }
  });
};
