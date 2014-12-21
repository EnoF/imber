// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(express, bodyParser, mongoose, params) {
  'use strict';

  var app = express();
  var router = express.Router();
  var user = require('./user');
  var authorization = require('./authorization');

  params.extend(app);

  app.use(bodyParser.json());

  app.use(router);
  router.use('/api/*', authorization);

  mongoose.connect(process.env.IMBER_MONGO);

  var db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function initiateServer() {

    app.param('id', String);

    app.post('/api/login', user.login);
    app.post('/api/reauthenticate', user.reauthenticate);
    app.post('/api/user', user.register);

    app.get('/api/user', user.searchFor);
  });
  module.exports = app;

}(require('express'), require('body-parser'), require('mongoose'), require('express-params')));
