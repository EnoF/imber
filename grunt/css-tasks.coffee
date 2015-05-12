module.exports =
  cssmin:
    options:
      banner: '/* //// Imber - ProVictores //// Copyright (C) //// 2015 Jumio, Inc. //// */'
    src: 'dist/styles/main.min.css'
    dest: '.tmp/styles/main.css'
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
