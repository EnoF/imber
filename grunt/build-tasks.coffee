module.exports =
  clean :
    files : [
      dot : true
      src : [
        '.tmp'
        'dist'
      ]
    ]
  copy :
    files : [{
      expand : true
      cwd : 'app/bower_components/bootstrap-material-design/fonts/'
      dest : '.tmp/fonts/'
      src : [
        '*.eot'
        '*.svg'
        '*.ttf'
        '*.woff'
        '*.woff2'
      ]
    }, {
      expand : true
      flatten : true
      cwd : 'app/widgets/'
      dest : '.tmp/images/widgets/'
      src : [
        '**/*.svg'
        '**/*.png'
        '**/*.jpg'
        '**/*.jpeg'
      ]
    }, {
      expand : true
      flatten : true
      cwd : 'app/core/'
      dest : '.tmp/images/core/'
      src : [
        '**/*.svg'
        '**/*.png'
        '**/*.jpg'
        '**/*.jpeg'
      ]
    }]
  copy__dist :
    files : [{
      src: 'app/index.html'
      dest: 'dist/index.html'
    },{
      expand : true
      cwd : 'app/bower_components/bootstrap-material-design/fonts/'
      dest : 'dist/fonts/'
      src : [
        '*.eot'
        '*.svg'
        '*.ttf'
        '*.woff'
        '*.woff2'
      ]
    }, {
      expand : true
      flatten : true
      cwd : 'app/widgets/'
      dest : 'dist/images/widgets/'
      src : [
        '**/*.svg'
        '**/*.png'
        '**/*.jpg'
        '**/*.jpeg'
      ]
    }, {
      expand : true
      flatten : true
      cwd : 'app/core/'
      dest : 'dist/images/core/'
      src : [
        '**/*.svg'
        '**/*.png'
        '**/*.jpg'
        '**/*.jpeg'
      ]
    }]
