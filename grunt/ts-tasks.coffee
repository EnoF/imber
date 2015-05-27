module.exports =
  ts__all:
    src: [
      'app/bower_components/type-def/angularjs/angular.d.ts'
      'app/bower_components/type-def/angularjs/angular-route.d.ts'
      'app/bower_components/type-def/angular-material/angular-material.d.ts'
      'app/core/models/**/*.ts'
      'app/core/dao/**/*.ts'
      'app/core/modules/**/*.ts'
      'app/core/widgets/**/src/**/*.ts'
      'app/core/widgets/**/*.ts'
      '!app/core/widgets/**/test/**'
      'app/widgets/**/src/**/*.ts'
      'app/widgets/**/*.ts'
      '!app/widgets/**/test/**'
      'app/app.ts'
    ]
    reference: 'app/reference.ts'
    out: '.tmp/js/build.js'
  ts__seperate:
    src: [
      'app/bower_components/type-def/angularjs/angular.d.ts'
      'app/bower_components/type-def/angularjs/angular-route.d.ts'
      'app/bower_components/type-def/angular-material/angular-material.d.ts'
      'app/bower_components/type-def/node/node.d.ts'
      'app/bower_components/type-def/mocha/mocha.d.ts'
      'app/bower_components/type-def/sinon-chai/sinon-chai.d.ts'
      'test/angular-mocks.d.ts'
      'test/*.ts'
      'app/core/models/**/*.ts'
      'app/core/dao/**/*.ts'
      'app/core/modules/**/*.ts'
      'app/core/widgets/**/src/**/*.ts'
      'app/core/widgets/**/*.ts'
      'app/widgets/**/src/**/*.ts'
      'app/widgets/**/*.ts'
      'app/app.ts'
    ]
    reference: 'app/reference.ts'
    outDir: '.tmp/js'
  uglify:
    options:
      wrap: 'exports'
    files: [
      src: [
        '.tmp/js/build.js'
        ]
      dest: '.tmp/js/build.min.js'
    ]
  uglify__angular:
    files: [
      src: [
        'app/bower_components/angular/angular.js'
        'app/bower_components/angular-animate/angular-animate.js'
        'app/bower_components/angular-aria/angular-aria.js'
        'app/bower_components/angular-material/angular-material.js'
        'app/bower_components/angular-route/angular-route.js'
        'app/bower_components/angular-translate/angular-translate.js'
        'app/bower_components/angular-messages/angular-messages.js'
        'app/bower_components/angular-validation-match/dist/angular-input-match.js'
        ]
      dest: '.tmp/js/angular.min.js'
    ]
  concat:
    files: [
      src: [
        '.tmp/js/angular.min.js'
        '.tmp/js/build.min.js'
        '.tmp/js/templates.min.js'
      ]
      dest: 'dist/js/<%= package.name %>.min.js'
    ]
  watch:
    files: [
      'app/core/**/*.ts'
      'app/widgets/**/*.ts'
      'app/app.ts'
      'test/*.ts'
    ]
    tasks: [
      'ts'
      'karma:test_background:run'
    ]
