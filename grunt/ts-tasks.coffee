module.exports =
  ts__all:
    src: [
      'app/bower_components/type-def/angularjs/angular.d.ts'
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
  concat:
    files: [
      src: [
        'app/bower_components/angular/angular.min.js'
        'app/bower_components/angular-cookies/angular-cookies.min.js'
        'app/bower_components/angular-route/angular-route.min.js'
        'app/bower_components/angular-translate/angular-translate.min.js'
        '.tmp/js/build.min.js'
        '.tmp/js/templates.min.js'
      ]
      dest: '.tmp/js/<%= package.name %>.min.js'
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
