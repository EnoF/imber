(function serverIndex(server, express) {
  'use strict';

  server.use(express.static(__dirname + '/dist'));
  var port = Number(process.env.PORT || 9000);
  server.listen(port, function notify() {
    console.log('Server listening on port: ' + port);
  });
}(require('./server/server.js'), require('express')));