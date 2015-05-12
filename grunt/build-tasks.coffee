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
      cwd: 'app/images/'
      dest: '.tmp/images/'
      src: [
        '*.svg'
        '*.png'
        '*.jpg'
        '*.jpeg'
      ]
    }]
