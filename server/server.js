// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(express, bodyParser, mongoose, params) {
  'use strict';

  var app = express();
  var user = require('./user');

  params.extend(app);

  app.use(bodyParser.json());

  mongoose.connect(process.env.IMBER_MONGO);

  var db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function initiateServer() {

    app.param('id', String);

    app.post('/login', user.login);
    app.post('/reauthenticate', user.reauthenticate);

    app.post('/user', user.register);

  });
  module.exports = app;

}(require('express'), require('body-parser'), require('mongoose'), require('express-params')));
