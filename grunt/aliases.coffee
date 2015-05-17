module.exports = (grunt) ->
  build: [
    'clean'
    'copy:build'
    'ngtemplates:html'
    'ts'
    'template'
    'concat'
    'less'
  ]
  migrationConfig: () ->
    fs = require 'fs'
    config =
      imber:
        host: process.env.IMBER_MONGO_URL || 'localhost'
        db: 'imber'
        username: process.env.IMBER_MONGO_USER
        password: process.env.IMBER_MONGO_PASSWORD
        port: process.env.IMBER_MONGO_PORT || 27017
    content = JSON.stringify config
    done = this.async()
    fs.writeFile '.tmp/config.json', content, done
  migrate: (target) ->
    grunt.task.run([
      'migrationConfig'
      'mongo-migrate:' + target
    ])
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
    # deactivated untill e2e tests are written
    # 'protractor_webdriver'
    # 'protractor:test_ci'
    'dist'
  ]
  default: [
    'package'
  ]
