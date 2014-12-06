(function serverIndex(server, express) {
    'use strict';

    server.use(express.static(__dirname + '/app'));
    server.use(express.static(__dirname + '/.tmp'));
    server.listen(9000, function notify() {
        console.log('Server listening on port 9000');
    });
}(require('./server/server.js'), require('express')));