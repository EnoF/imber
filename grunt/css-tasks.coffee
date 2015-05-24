module.exports =
  cssmin:
    options:
      banner: '/* //// Imber - ProVictores //// Copyright (C) //// 2015 Jumio, Inc. //// */'
    src: '.tmp/styles/main.css'
    dest: 'dist/styles/main.min.css'
  less:
    options:
      sourceMap: true
      sourceMapFilename: '.tmp/styles/main.map'
      sourceMapURL: '/styles/main.map'
      sourceMapBasepath: 'app'
      sourceMapRootpath: '/'
      ieCompat: true
    src: 'app/core/styles/main.less'
    dest: '.tmp/styles/main.css'
  concat:
    src: [
      'app/core/widgets/**/*.less'
      'app/widgets/**/*.less'
    ]
    dest: '.tmp/styles/widgets.less'
  watch:
    files: [
      'app/core/**/*.less'
      'app/widgets/**/*.less'
    ]
    tasks: [
      'concat'
      'less'
    ]
