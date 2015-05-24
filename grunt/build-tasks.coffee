module.exports =
  clean:
    files: [
      dot: true
      src: [
        '.tmp'
        'dist'
      ]
    ]
  copy:
    files: [{
      expand: true
      cwd: 'app/bower_components/bootstrap/fonts/'
      dest: '.tmp/fonts/'
      src: [
        '*.eot'
        '*.svg'
        '*.ttf'
        '*.woff'
      ]
    }, {
      expand: true
      flatten: true
      cwd: 'app/widgets/'
      dest: '.tmp/images/widgets/'
      src: [
        '**/*.svg'
        '**/*.png'
        '**/*.jpg'
        '**/*.jpeg'
      ]
    }, {
      expand: true
      flatten: true
      cwd: 'app/core/'
      dest: '.tmp/images/core/'
      src: [
        '**/*.svg'
        '**/*.png'
        '**/*.jpg'
        '**/*.jpeg'
      ]
    }]
