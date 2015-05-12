module.exports =
  build: [
    'clean'
    'copy:build'
    'ngtemplates:html'
    'ts'
    'template'
    'less'
  ]
  verify: [
    'build'
    'tslint'
  ]
  setupEnv: [
    'verify'
    'express:server'
  ]
  test: [
    'setupEnv'
    'karma:test_single'
  ]
  server: [
    'setupEnv'
    'karma:test_background'
    'watch'
  ]
  dist: [
    'copy'
    'less'
    'cssmin'
    'ngtemplates:html_dist'
    'uglify'
    'concat'
  ]
  serverDist: [
    'dist'
    'express:server_dist',
    'watch'
  ]
  e2e: [
    'protractor_webdriver'
    'protractor:test_all'
  ]
  package: [
    'test'
    'protractor_webdriver'
    'protractor:test_ci'
    'dist'
  ]
  default: [
    'package'
  ]
