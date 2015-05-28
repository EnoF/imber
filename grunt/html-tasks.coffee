module.exports =
  ngtemplates:
    src: [
      'app/widgets/**/src/*.html'
      'app/widgets/**/src/pages/*.html'
      'app/core/widgets/**/src/*.html'
    ]
    dest: '.tmp/js/templates.js'
    options:
      module: '<%= package.name %>.templates',
      url: (url) =>
        return url.replace /(([\s\S]*?)\/widgets\/([\s\S]*?)\/src\/)|.html/g, ''
  ngtemplates__dist:
    src: [
      'app/widgets/**/src/*.html'
      'app/widgets/**/src/pages/*.html'
      'app/core/widgets/**/src/*.html'
    ]
    dest: '.tmp/js/templates.min.js'
    options:
      module: '<%= package.name %>.templates',
      htmlmin:
        collapseBooleanAttributes: true
        collapseWhitespace: true
        removeAttributeQuotes: true
        removeComments: true
        removeEmptyAttributes: true
        removeRedundantAttributes: true
        removeScriptTypeAttributes: true
        removeStyleLinkTypeAttributes: true
      url: (url) =>
        return url.replace /(([\s\S]*?)\/widgets\/([\s\S]*?)\/src\/)|.html/g, ''
  watch:
    files: [
      'app/core/widgets/**/src/*.html'
      'app/widgets/**/src/*.html'
    ]
    tasks: [
      'ngtemplates'
    ]
