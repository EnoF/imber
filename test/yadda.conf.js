module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

    files: [
      // jQuery for easier testing
      'app/bower_components/jquery/dist/jquery.js',
      // Angular dependencies
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-cookie/angular-cookie.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-aria/angular-aria.min.js',
      'app/bower_components/angular-animate/angular-animate.min.js',
      'app/bower_components/hammerjs/hammer.min.js',
      'app/bower_components/angular-material/angular-material.min.js',
      'app/bower_components/enofjs/src/clazz.js',
      // App wiring
      'app/app.js',
      // DAO
      'app/dao/**/*.js',
      // Models
      'app/models/**/*.js',
      // Modules
      'app/modules/*.js',
      // Directives
      'app/directives/*.js',
      // View Models
      'app/viewModels/**/*.js',
      // Views encapsuled in widgets
      'app/widgets/**/*.js',
      // Templates for the widgets
      '.tmp/scripts/templates.js',
      // The specs for unit testing
      'test/unit/**/*.js',


      'test/step_definitions/*.step.js', {
        pattern: 'test/features/*.feature',
        included: false
      }
    ],

    // list of files / patterns to exclude
    exclude: ['test/unit/**/*.js'],

    browserify: {
      debug: true,
      files: [
        '.tmp/test.spec.js',
        'test/bottle-library.js',
        'test/step_definitions/*.step.js'
      ]
    },

    preprocessors: {
      '.tmp/test.spec.js': 'browserify',
      'test/bottle-library.js': 'browserify',
      'test/step_definitions/*.step.js': 'browserify'
    },

    reporters: ['mocha'],
    port: 5050,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: false,
    autoWatch: false,

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
