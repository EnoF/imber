fs = require 'fs'

addFeatures = (baseFolder, features) ->
  try
    featureFiles = fs.readdirSync(baseFolder + '/test/features/')
    featureFiles.forEach ((feature) ->
      @push fs.readFileSync(baseFolder + '/test/features/' + feature, encoding: 'utf8')
      return
    ), features
  catch e
    console.warn baseFolder + ' does not contain any tests'
  return

addWidgetFeatures = (baseFolder, features) ->
  try
    widgets = fs.readdirSync(baseFolder)
    widgets.forEach (widget) ->
      addFeatures baseFolder + widget, features
      return
  catch e
    console.warn baseFolder + ' does not exist'
  return

module.exports =
  karma__single:
    configFile: 'test/karma.conf.js'
    singleRun: true
  karma__background:
    configFile: 'test/karma.conf.js'
    background:true
  protractor__ci:
    options:
      configFile: 'test/ci.config.js'
      keepAlive: true
      noColor: false
  protractor__all:
    options:
      configFile: 'test/all.config.js'
      keepAlive: true
      noColor: false
  template:
    options:
      data: () =>
        features = []
        addWidgetFeatures 'app/widgets/', features
        addWidgetFeatures 'app/core/widgets/', features
        data =
          features: features
          module: 'imber'
    src: 'test/test.spec.template'
    dest: '.tmp/test.spec.js'
  simplemocha:
    src: 'test/unit/server/**/*.js'
  watch:
    files: [
      'app/widgets/**/test/features/*.feature'
      'app/core/widgets/**/test/features/*.feature'
    ]
    tasks: [
      'template'
      'karma:test_background:run'
    ]
  watch__server:
    files: [
      'test/unit/server/*.js'
    ]
    tasks: [
      'simplemocha'
    ]
