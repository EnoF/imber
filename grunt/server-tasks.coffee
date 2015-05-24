module.exports =
  express:
    options:
      port: 9000
      hostname: '0.0.0.0'
      bases: [
        'app'
        '.tmp'
      ]
      middleware: [(req, res, next) =>
        req.url = req.url.replace /\/app\//, '/'
        next()
      ]
      server: 'server/server'
  express__dist:
    options:
      port: 9000
      hostname: '0.0.0.0'
      bases: [
        'dist'
      ]
      middleware: [(req, res, next) =>
        req.url = req.url.replace /\/app\//, '/'
        next()
      ]
      server: 'server/server'
      livereload: true
